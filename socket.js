const socketIo = require("socket.io");
const fs = require("fs");

const {
  readMessage,
  saveChatMessage,
  createChatRoomAndChatMembers,
  userSendGiftsFromChat,
  sendCreditFromChat,
} = require("../controllers/communication/chatController");
const {
  startCall,
  endCall,
  videoCallCredit,
  checkUserCreditAndCalMin,
} = require("../controllers/communication/videoCallController");
const {
  getOneConfiguration,
} = require("../services/master/configurationService");
const { findVideoCall } = require("../services/communication/videoCallService");
const { getOneUser } = require("../services/users/userService");
const { Op } = require("sequelize");
// const ss = require("socket.io-stream");

// Initialize the activeStreams variable
const activeStreams = new Map();
let io;
// // --------- live stream ------------
let viewerCount = 0;

// type Message = { text: string, date: Date };

const messageList = [];

function purgeLastHundred() {
  if (messageList.length > 200) {
    messageList.slice(100);
  }
}

setInterval(purgeLastHundred, 10000);
// // ------------------------------------------

const initializeSocket = (server) => {
  io = socketIo(server, {
    transports: ["polling"],
    maxHttpBufferSize: 1e8,
    // cors: {
    //   origin: process.env.APP_URL, // Replace with your client's URL
    //   methods: ["GET", "POST", "PUT"],
    // },
    cors: {
      origin: "*",
    },
  });

  // io.use((socket, next) => {
  // if (socket.handshake.query) {
  //   let userId = socket.handshake.query.userId;
  //   socket.userId = userId;
  //   next();
  // }
  // });

  io.on("connection", (socket) => {
    // =========================== live streaming ======================
    // ------------------------- / start live stream --------------------

    viewerCount++;
    console.log("a user connected. Total viewer count:", viewerCount);
    socket.emit("viewer-count", viewerCount);

    socket.on("disconnect", () => {
      viewerCount--;
      console.log("A user disconnected. Total viewer count:", viewerCount);
      socket.emit("viewer-count", viewerCount);
    });

    socket.on("join-as-streamer", (streamerId) => {
      console.log(" in socket : ", streamerId);
      socket.emit("connection", 1);

      // socket.emit("streamer-joined", streamerId);
    });

    socket.on("disconnect-as-streamer", (streamerId) => {
      socket.broadcast.emit("streamer-disconnected", streamerId);
    });

    socket.on("join-as-viewer", (viewerId) => {
      socket.broadcast.emit("viewer-connected", viewerId);
      socket.emit("backfill-messages", messageList);
    });

    socket.on("add-message-to-live-chat", (messageText) => {
      const message = {
        text: messageText,
        date: new Date(),
      };

      messageList.push(message);
      socket.emit("new-message", message);
      socket.broadcast.emit("new-message", message);
      console.log(" message ------------- ", messageText);
    });
    // ------------------------- / end live stream --------------------
    console.log("A user connected");

    // // Handle WebRTC signaling
    // socket.on("offer", (offer, id) => {
    //   console.log("Received offer:", offer);
    //   io.to(id).emit("offer", offer, socket.id);
    // });

    // socket.on("answer", (answer, id) => {
    //   console.log("Received answer:", answer);
    //   io.to(id).emit("answer", answer, socket.id);
    // });

    // socket.on("ice-candidate", (candidate, id) => {
    //   console.log("Received ice candidate:", candidate);
    //   io.to(id).emit("ice-candidate", candidate, socket.id);
    // });

    // // Listen for the 'stream' event from the client
    // ss(socket).on("stream", (stream) => {
    //   // Add the stream to the list of active streams
    //   activeStreams.set(socket.id, { stream, viewers: 0 });
    //   console.log("activeStreams :", activeStreams);

    //   // Broadcast the stream to all connected clients
    //   io.emit("stream", stream);

    //   // Notify clients about the updated list of live users
    //   updateLiveUsers();
    // });

    // // Listen for the 'end-stream' event to end the stream
    // socket.on("end-stream", () => {
    //   console.log("in end stream :", activeStreams);
    //   if (activeStreams.has(socket.id)) {
    //     console.log("in if ");

    //     const { stream } = activeStreams.get(socket.id);
    //     stream.end();
    //     activeStreams.delete(socket.id);
    //     // Notify clients that the stream has ended
    //     console.log(" call strream end");
    //     io.emit("stream-end", { message: "Live stream has ended." });
    //     // Notify clients about the updated list of live users
    //     updateLiveUsers();
    //   }
    // });

    // // Handle user disconnection
    // socket.on("disconnect", () => {
    //   console.log("a user disconnected");
    //   // If the user disconnects, end the stream
    //   socket.emit("end-stream");
    // });

    // // Increment viewers count when a user starts watching
    // socket.on("start-watching", (streamerId) => {
    //   if (activeStreams.has(streamerId)) {
    //     activeStreams.get(streamerId).viewers += 1;
    //     // Notify clients about the updated list of live users
    //     updateLiveUsers();
    //   }
    // });

    // // Decrement viewers count when a user stops watching
    // socket.on("stop-watching", (streamerId) => {
    //   if (activeStreams.has(streamerId)) {
    //     const { viewers } = activeStreams.get(streamerId);
    //     if (viewers > 0) {
    //       activeStreams.get(streamerId).viewers -= 1;
    //       // Notify clients about the updated list of live users
    //       updateLiveUsers();
    //     }
    //   }
    // });

    // // Function to notify clients about the updated list of live users
    // function updateLiveUsers() {
    //   const liveUsers = Array.from(activeStreams.keys()).map((streamerId) => {
    //     const { viewers } = activeStreams.get(streamerId);
    //     return { streamerId, viewers };
    //   });

    //   io.emit("update-live-users", liveUsers);
    // }

    // // Listen for the 'stream' event from the client
    // ss(socket).on('stream', (stream, data) => {
    //   const filename = __dirname + '/uploads/' + data.name;
    //   // Create a writable stream to write the incoming data to a file
    //   const writable = require('fs').createWriteStream(filename);
    //   stream.pipe(writable);

    //   stream.on('end', () => {
    //     console.log('File saved successfully.');
    //     // Notify the client that the file has been received successfully
    //     socket.emit('stream-end', { message: 'File saved successfully.' });
    //   });
    // });

    // =========================================================
    socket.on("user_connected", (userId) => {
      console.log("A user connected", userId);

      // Associate the socket with the user's ID
      // socket.join(userId);
    });

    // ==================== video call =======================

    // socket.on("join-room", (roomId, userId) => {
    //   // console.log(roomId, userId);
    //   socket.join(roomId);

    //   // Emit an event to acknowledge that the user has joined the room
    //   socket.to(roomId).emit("user-connected", userId);

    //   // Handle signaling: offer, answer, and ICE candidates
    //   socket.on("offer", async (data) => {
    //     const { offer, receiverId, senderId } = data;

    //     let chatRoomId = data?.chatRoomId;
    //     let chatId = data?.chatId;

    //     // if (!chatRoomId) {
    //     //   // Create a chat room between sender and receiver
    //     //   const chatRoom = await createChatRoomAndChatMembers(
    //     //     senderId,
    //     //     receiverId
    //     //   );
    //     //   console.log("chatRoom :  ---------- ", chatRoom);
    //     //   chatRoomId = chatRoom?.chatRoomId;
    //     //   chatId = chatRoom?.chatId;
    //     // }

    //     // Send the offer to the specific receiver
    //     socket.to(receiverId).emit("receive-offer", senderId, offer);
    //     socket.emit("receive-offer", senderId, offer);

    //     // startCall(senderId, receiverId, chatRoomId, chatId);
    //   });
    // ..........................
    socket.on("join_room", (room, chatId) => {
      // const currentRoom = socket.currentRoom;

      // console.log(" before currentRoom: " + currentRoom);
      // // Leave the current room if the user was in a room
      // if (currentRoom) {
      //   socket.leave(currentRoom);

      //   // Broadcast to the current room that a user has left
      //   io.to(currentRoom).emit("userLeft", socket.id);
      // }

      // Join the new room

      socket.join(room);
      // socket.currentRoom = room;

      // const socketsInRoom = io.sockets.adapter.rooms.get(room);

      // // Calculate the number of users in the room
      // const numUsersInRoom = socketsInRoom ? socketsInRoom.size : 0;
      // console.log("currentRoom: " + socket.currentRoom);

      // When a user initiates a video call request within the room
      socket.on("start_call", (data) => {
        const { userId, receiverId } = data;
        io.to(room).emit("incoming_call", userId, receiverId);

        let call = startCall(userId, receiverId, room, chatId);
      });

      // When a user rejects a video call
      socket.on("reject_call", (data) => {
        const { userId, receiverId } = data;
        io.to(userId).emit("call_rejected", receiverId);
      });

      // When a user rejects a video call
      socket.on("not_answered_call", (data) => {
        const { userId, receiverId } = data;
        io.to(userId).emit("call_not_answered", receiverId);
      });

      socket.on("answer_call", (data) => {
        const { userId, receiverId } = data;

        io.to(room).emit("incoming-answer", receiverId);
      });

      // When a user ends a video call within the room
      socket.on("end_call", (data) => {
        const { userId, receiverId } = data;
        io.to(room).emit("call_ended", userId);

        endCall(userId, receiverId, room);
      });

      // ===================== send message ===========================
      socket.on("chat_message", async (data) => {
        try {
          const { message, senderId, receiverId, type, chatRoomId, chatId } =
            data;
          // let chatRoomId = data?.chatRoomId;
          // let chatId = data?.chatId;
          // if (!chatRoomId) {
          //   // Create a chat room between sender and receiver
          //   const chatRoom = await createChatRoomAndChatMembers(
          //     senderId,
          //     receiverId
          //   );
          //   console.log("chatRoom :  ---------- ", chatRoom);
          //   chatRoomId = chatRoom?.chatRoomId;
          //   chatId = chatRoom?.chatId;
          // }
          // Save the chat message to the database using the database function
          const savedMessage = await saveChatMessage(
            message,
            senderId,
            receiverId,
            chatRoomId,
            chatId,
            type
          );
          // Send the message to the receiver
          io.to(chatRoomId).emit("chat_message", savedMessage);
          // io.to(receiverId).emit("chat_message", savedMessage);
        } catch (error) {
          // Handle any errors
          console.error("Error:", error);
        }
      });

      socket.on("send_credit", async (data) => {
        try {
          const { message, senderId, receiverId, type, chatRoomId, chatId } =
            data;
          // let chatRoomId = data?.chatRoomId;
          // let chatId = data?.chatId;
          // if (!chatRoomId) {
          //   // Create a chat room between sender and receiver
          //   const chatRoom = await createChatRoomAndChatMembers(
          //     senderId,
          //     receiverId
          //   );
          //   console.log("chatRoom :  ---------- ", chatRoom);
          //   chatRoomId = chatRoom?.chatRoomId;
          //   chatId = chatRoom?.chatId;
          // }
          // Save the chat message to the database using the database function
          const savedMessage = await sendCreditFromChat(
            message,
            senderId,
            receiverId,
            chatRoomId,
            chatId,
            type
          );
          // Send the message to the receiver
          io.to(chatRoomId).emit("chat_message", savedMessage);
          // io.to(receiverId).emit("chat_message", savedMessage);
        } catch (error) {
          // Handle any errors
          console.error("Error:", error);
        }
      });

      // =================== send media =======================

      socket.on("media_message", async (data) => {
        try {
          const {
            senderId,
            receiverId,
            fileData,
            chatRoomId,
            chatId,
            fileName,
          } = data;

          // console.log(data);

          const uploadPath = "./uploads";
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          const uploadMediaPath = "./uploads/chatMedia";
          if (!fs.existsSync(uploadMediaPath)) {
            fs.mkdirSync(uploadMediaPath, { recursive: true });
          }
          const filePath = `uploads/chatMedia/${Date.now()}--${fileName}`;
          fs.writeFile(filePath, fileData, "base64", (err) => {
            if (err) {
              console.error("Error saving media file:", err);
              return;
            }
            const savedMessage = saveChatMessage(
              filePath,
              senderId,
              receiverId,
              chatRoomId,
              chatId,
              "media"
            );

            // Send the message to the receiver
            // io.to(receiverId).emit("chat_message", filePath);
            io.to(chatRoomId).emit("chat_message", filePath);
          });
        } catch (error) {
          // Handle any errors
          console.error("Error:", error);
        }
      });

      // ==================== read message ======================

      socket.on("message_read", async (msgData) => {
        try {
          const { messageId, userId } = msgData;

          // Update the isRead field in the database for the specified message
          readMessage(messageId, userId);
        } catch (error) {
          // Handle any errors
          console.error("Error:", error);
        }
      });

      // ===================== send gift ===========================

      socket.on("send_gift", async (data) => {
        try {
          const { giftId, senderId, receiverId, type, chatRoomId, chatId } =
            data;

          const gift = await userSendGiftsFromChat(
            giftId,
            senderId,
            receiverId,
            chatRoomId,
            chatId,
            type
          );
          // Send the message to the receiver
          // io.to(receiverId).emit("gift_message", gift);
          io.to(chatRoomId).emit("gift_message", gift);

          // io.to(receiverId).emit("chat_message", savedMessage);
        } catch (error) {
          // Handle any errors
          console.error("Error:", error);
        }
      });

      // Handle user disconnect
      socket.on("disconnect", () => {
        console.log(`User disconnected from room: ${room}`);
        socket.leave(room); // User leaves the room
      });
    });

    // .............................
    // socket.on("answer", (answer, senderId) => {
    //   // Send the answer to the specific sender
    //   socket.to(senderId).emit("receive-offer", userId, answer);
    // });

    // socket.on("ice-candidate", (candidate, remoteUserId) => {
    //   // Send ICE candidate to the specific user
    //   socket
    //     .to(remoteUserId)
    //     .emit("receive-ice-candidate", userId, candidate);
    // });

    // // Handle call ending
    // socket.on("disconnect", () => {
    //   // Record the call ending in the database
    //   // endCall(userId, roomId);
    //   // Notify other users in the room about the disconnection
    //   socket.to(roomId).emit("user-disconnected", userId);
    // });
    // });

    // ----------------------------------------------------------
    // socket.on("join-room", (chatRoomId, userId) => {
    //   socket.join(chatRoomId);
    //   socket.to(chatRoomId).broadcast.emit("user-connected", userId);

    //   socket.on("call-user", (data) => {
    //     const { senderId, receiverId, chatRoomId } = data;

    //     socket.to(data.to).emit("call-made", {
    //       offer: data.offer,
    //       socket: socket.id,
    //     });

    //     startCall(senderId, receiverId, chatRoomId);
    //   });

    //   socket.on("make-answer", (data) => {
    //     socket.to(data.to).emit("answer-made", {
    //       socket: socket.id,
    //       answer: data.answer,
    //     });
    //   });

    //   socket.on("reject-call", (data) => {
    //     socket.to(data.from).emit("call-rejected", {
    //       socket: socket.id,
    //     });
    //   });

    //   // socket.on("disconnect", () => {
    //   //   this.activeSockets = this.activeSockets.filter(
    //   //     (existingSocket) => existingSocket !== socket.id
    //   //   );
    //   // });

    //   socket.on("disconnect", () => {
    //     socket.to(chatRoomId).broadcast.emit("user-disconnected", userId);
    //   });
    // });

    socket.on("create_room", async (data) => {
      try {
        const { senderId, receiverId } = data;

        // Create a chat room between sender and receiver
        const chatRoom = await createChatRoomAndChatMembers(
          senderId,
          receiverId
        );
        // console.log("chatRoom :  ---------- ", chatRoom);

        const chatRoomId = chatRoom?.chatRoomId;
        const chatId = chatRoom?.chatId;

        io.to(senderId).emit("get_room", {
          chatRoomId: chatRoomId,
          chatId: chatId,
        });
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
      }
    });

    // ==================== check user credit for do video call with particular minutes.  ======================

    socket.on("check_credit", async (senderId) => {
      try {
        let result = await checkUserCreditAndCalMin(senderId);

        io.to(senderId).emit("total_min", result);
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
      }
    });

    // ==================== credit Cut after 1 min & when accept call  ======================

    socket.on("credit_deduct", async (senderId) => {
      try {
        // Update the totalCredit field in the database.
        let result = await videoCallCredit(senderId);

        io.to(senderId).emit("display_credit", result);
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
      }
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

const userCreditUpdate = async (userId) => {
  // check if user is continue on any call

  let videoCallConfiguration = await getOneConfiguration({
    type: "videocall",
    status: true,
  });
  const isOngoingCall = await findVideoCall({
    status: true,
    [Op.or]: [{ callStatus: "pending" }, { callStatus: "answered" }],
    senderId: userId,
  });

  if (isOngoingCall) {
    let query = {
      status: true,
      userId: userId,
    };

    const user = await getOneUser(query);
    let totalMin =
      (user.totalCredit * 1) / videoCallConfiguration?.creditPerMin;

    io.emit("totalCallMinutes", totalMin || 0);
  }
};

const userActivity = async (activityDetails) => {
  io.emit("newActivity", activityDetails || null);
};

module.exports = { initializeSocket, getIo, userCreditUpdate, userActivity };
