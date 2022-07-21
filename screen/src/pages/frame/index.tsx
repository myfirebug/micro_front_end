import {
  FC, useEffect
} from 'react'
import { ALL_STATE, IRouter, IMenu, IBreadCrumbsItem } from '@store/actionType'
import { connect } from 'react-redux'
import { getMenu, updateCurrentTabKey } from '@src/store/actions/authorization'
import Routers from './components/routers'
import BreadCrumbs from './components/bread-crumbs'
import CustomMenu from './components/menu'

import './index.scss'


interface IFrameProps {
  routers: IRouter[];
  getMenu: (menu?: IMenu[]) => void;
  menu: IMenu[];
  updateCurrentTabKey: (key?: string) => void;
  currPageTabKey: string;
  breadCrumbs: IBreadCrumbsItem[];
  parentParams: any;
}

const Frame: FC<IFrameProps> = ({
  routers,
  getMenu,
  menu,
  updateCurrentTabKey,
  currPageTabKey,
  breadCrumbs,
  parentParams
}) => {
  useEffect(() => {
    if (!menu.length && !parentParams.isMicroFront) {
      getMenu()
    }
    if (parentParams.isMicroFront) {
      getMenu(parentParams.menus as IMenu[] || [])
    }
  }, [getMenu, menu, parentParams])
  return (
    <div className="app-screen-layout">
      {
        !parentParams.isMicroFront ?
          <div className="app-screen-layout__left">
            <CustomMenu
              menu={menu}
              routers={routers}
              parentParams={parentParams}
              updateCurrentTabKey={updateCurrentTabKey}
              currPageTabKey={currPageTabKey} />
          </div> : null
      }
      <div className="app-screen-layout__right">
        <BreadCrumbs
          currPageTabKey={currPageTabKey}
          breadCrumbs={breadCrumbs}
          updateCurrentTabKey={updateCurrentTabKey} />
        <div className="app-screen-layout__main">
          <Routers routers={routers} parentParams={parentParams} />
        </div>
      </div>
    </div>
  )
}

// 对应的statemkjh m,
const mapStateToProps = (state: ALL_STATE) => ({
  routers: state.authorization.routers,
  menu: state.authorization.menu,
  currPageTabKey: state.authorization.currPageTabKey,
  breadCrumbs: state.authorization.breadCrumbs
});

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = {
  getMenu,
  updateCurrentTabKey
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frame)