import { FC } from 'react'
import Frame from '@src/pages/frame'
import { getBasename } from '@ice/stark-app'
import {
  BrowserRouter as Router
} from 'react-router-dom'

interface IAppProps {
  parentParams: any
}

const App: FC<IAppProps> = ({
  parentParams
}) => {
  return (
    <Router basename={getBasename()}>
      <Frame parentParams={parentParams} />
    </Router>
  );
}

export default App
