import { useState, useEffect } from 'react'
import { ETabActive, EPlatformType } from '../contants'
import { getAssetsFile } from '@/utils/tools'
import StatusBar from './statusBar'
import { BugOutlined, SettingOutlined } from '@ant-design/icons'
import {  Progress } from 'antd'
import './header.less'

export default function Header(props: { dispatch: React.Dispatch<any> }) {

  const [tabActive, setTabActive] = useState(ETabActive.PERINSTALL)
  const tabList = [
    {
      index: ETabActive.PERINSTALL,
      title: '预装APP',
      icon: getAssetsFile('images/perinstall.png'),
      activeIcon: getAssetsFile('images/perinstall-active.png')
    }
  ]

  const changeTabActive = (index:number) => {
    setTabActive(index)
    props?.dispatch({
      type:'changeTabActive',
      data:index
    })
  }

  // 更新下载的进度
  const [downProcess, setDownProcess] = useState<number>(0)

  useEffect(() => {
    window.EAPI.downloadProcess((event: any, values: any) => {
      console.log('downloadProcess:', values)
      setDownProcess(Math.ceil(values.percent))
    })
  }, [])

  return <div className='header-scoped'>
    <div className='content'>
      <div className='left'>
        <div className='logo'>预装助手</div>
        <div className='tab-content'>
          {
            tabList.length > 1 && tabList.map(e => <div key={e.index} onClick={() => changeTabActive(e.index)} className='item'>
              <img src={e.index == tabActive ? e.activeIcon : e.icon} alt="" />
              <div>{e.title}</div>
            </div>)
          }
        </div>
      </div>
      <div className='right'>其他需要展示的信息</div>
    </div>
    <div className='setting'>

      {
        downProcess > 0 && downProcess < 100 &&
        <Progress type="circle" className='btn nohover' width={20} strokeWidth={10} percent={downProcess} format={(percent?: number) => <div style={{ color: '#fff' }}>{percent}</div>} />
      }
      {
        downProcess >= 100 && <div className='update-btn' onClick={() => window.EAPI.updateAndInstall()}>立即更新</div>
      }
      <BugOutlined className='btn' onClick={() => window.EAPI.openDevTools()} />
      {
        window?.EAPI?.platform == EPlatformType.win && <StatusBar />
      }
    </div>
  </div>
}
