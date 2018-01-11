import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { ListView, Drawer } from 'antd-mobile'
import { connect } from 'react-redux'

function hotBrandsRender(hot_brands, styles, handleRowClick) {
    return (
        <div>
            <h3 className={styles['hot-brands-header']}>熱門產牌</h3>
            <div className={styles['hot-brands-container']}>
                {
                    hot_brands.map(item => (
                        <a key={item.id} className={styles['hot-brands-item']} onClick={() => handleRowClick(item)}>
                            <img src={item.image} />
                            <p>{item.name}</p>
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

function rowRender(rowData, sectionID, rowID, styles, handleRowClick) {
    return (
        <div className={styles['brand-item']} onClick={() => handleRowClick(rowData)}>
            <img src={rowData.image}/>
            <p>{`${rowData.en_name} / ${rowData.name}`}<span style={{ marginLeft: 10, color: '#999' }}>({rowData.count}輛)</span></p>
        </div>
    )
}

function sidebarRender(styles, models, selectedBrand) {
    return (
        <ul className={styles['model-list']}>
            <li className={styles['model-list-header']}>
                <img src={selectedBrand.image} />
                <p>{`${selectedBrand.en_name} / ${selectedBrand.name}`}</p>
            </li>
            {
                models.map(item => (
                    <li key={item.id}>
                        <img src={item.image} />
                        <p>{item.name}</p>
                    </li>
                ))
            }
        </ul>
    )
}

class BrandConditionsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectedBrand: {}
        }
        this.handleRowClick = this.handleRowClick.bind(this)
        this.handleOpenChange = this.handleOpenChange.bind(this)
    }

    handleRowClick(rowData) {
        setTimeout(() => {
            ReactDOM.findDOMNode(this.lv).childNodes[0].style.overflow = 'hidden'
        }, 0)
        this.props.dispatch({ type: 'autos/fetchModels', payload: { id: rowData.id } })
        this.setState(prevState => ({
            open: true,
            selectedBrand: rowData
        }))
    }

    handleOpenChange() {
        setTimeout(() => {
            ReactDOM.findDOMNode(this.lv).childNodes[0].style.overflow = 'auto'
            ReactDOM.findDOMNode(this.drawer).childNodes[0].childNodes[0].scrollTop = 0
        }, 0)
        this.setState({
            open: !this.state.open,
            selectedBrand: {}
        })
    }

    render() {
        const { styles, dataSource, hot_brands, models } = this.props
        const { open, selectedBrand } = this.state
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Drawer
                    ref={el => this.drawer = el}
                    position="right"
                    open={open}
                    onOpenChange={this.handleOpenChange}
                    sidebar={sidebarRender(styles, models, selectedBrand)}
                    sidebarStyle={{
                        background: '#fff',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        minHeight: '100%',
                        width: '80%',
                    }}
                >
                    <ListView.IndexedList
                        ref={el => this.lv = el}
                        dataSource={dataSource}
                        renderRow={(rowData, sectionID, rowID) => rowRender(rowData, sectionID, rowID, styles, this.handleRowClick)}
                        style={{
                            height: '100%',
                            overflow: 'auto',
                        }}
                        pageSize={10}
                        renderSectionHeader={sectionData => {
                            return (
                                <div>{sectionData}</div>
                            )
                        }}
                        renderHeader={() => hotBrandsRender(hot_brands, styles, this.handleRowClick)}
                        quickSearchBarStyle={{ top: 200, color: '#FF5000' }}
                    />
                </Drawer>
            </div>
        )
    }
}

export default connect()(BrandConditionsList)
