import { useState } from 'react';
import './header.less';
import { CloseOutlined, MinusOutlined, BorderOutlined,SwitcherOutlined } from '@ant-design/icons';

export default function StatusBar() {
  const [fullScreenType, setFullScreenType] = useState<boolean>(false)

  // 放大缩小
  const changeFullScreen = () => {
    window.EAPI.winFullScreen(!fullScreenType)
    setFullScreenType(!fullScreenType)
  }

  return (
    <div className='header-status-bar'>
      <div className='bar-btn'>
        <div className='btn' onClick={() => window.EAPI.winMinimize()}><MinusOutlined /></div>
          <div className='btn' onClick={() => changeFullScreen()}>
            {
              fullScreenType ?<SwitcherOutlined />:<BorderOutlined />
            }
            </div>

          <div className='btn' onClick={() => window.EAPI.appQuit()}><CloseOutlined /></div>
      </div>
    </div>
  );
}
