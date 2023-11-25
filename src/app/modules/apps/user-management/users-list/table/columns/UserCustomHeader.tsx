import clsx from 'clsx'
import {FC, PropsWithChildren, useMemo} from 'react'
import {HeaderProps} from 'react-table'
import {initialQueryState} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {User} from '../../core/_models'
import {useIntl} from 'react-intl'

type Props = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<User>>
  tooltipTitle?: string
}
const UserCustomHeader: FC<Props> = ({className, title, tableProps, tooltipTitle}) => {
  const intl = useIntl()
  const id = tableProps.column.id
  const {state, updateState} = useQueryRequest()

  const isSelectedForSorting = useMemo(() => {
    return state.sort && state.sort === id
  }, [state, id])
  const order: 'asc' | 'desc' | undefined = useMemo(() => state.order, [state])

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === 'actions' || id === 'selection') {
      return
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      updateState({sort: id, order: 'asc', ...initialQueryState})
      return
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === 'asc') {
        // enable sort desc
        updateState({sort: id, order: 'desc', ...initialQueryState})
        return
      }

      // disable sort
      updateState({sort: undefined, order: undefined, ...initialQueryState})
    }
  }

  return (
    <>
      <th
        {...tableProps.column.getHeaderProps()}
        className={clsx(
          className,
          isSelectedForSorting && order !== undefined && `table-sort-${order}`
        )}
        style={{cursor: 'pointer'}}
        onClick={sortColumn}
      >
        {intl.formatMessage({id: title})} &nbsp;
        <i
          className='bi bi-question-circle'
          data-toggle='tooltip'
          data-placement='top'
          title={tooltipTitle}
        ></i>
      </th>
    </>
  )
}

export {UserCustomHeader}
