import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import '../../assets/stylesheets/application.css'

@inject('tierStore')
@observer
export class TxProgressStatus extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: true
    }
  }

  txStatuses = () => {
    const { txMap } = this.props
    const table = []

    txMap.forEach((txStatus, txName) => {
      table.push({ txName, txStatus })
    })

    return table
  }

  render () {
    const { tierStore } = this.props
    const tiers = new Array(tierStore.tiers.length).fill(true)
    const tableContent = this.txStatuses()

    return (
      tableContent.length
        ? <div className="flex-table">
          <div className="container-fluid">
            <div className="table-row flex-table-header">
              <div className="text">Tx Name</div>
              {tiers.map((value, index) => <div className="sm-text">Tier {index + 1}</div>)}
            </div>
            <div className="scrollable-content">
              {tableContent.map(tx =>
                tx.txStatus.length
                  ? <div className="table-row">
                    <div className="text">{tx.txName}</div>
                    {tiers.map((value, index) => (
                      <div className="sm-text">
                        {tx.txStatus[index] === true
                          ? <i className="material-icons">check</i>
                          : tx.txStatus[index] === false
                            ? <i className="material-icons">access_time</i>
                            : ''
                        }
                      </div>
                    ))}
                  </div>
                  : null
              )}
            </div>
          </div>
        </div>
        : null
    )
  }
}