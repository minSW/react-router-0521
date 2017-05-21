import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import home from './home';
import about from './about';
import Topics from './Topics';
//{}로 묶어서 export한것만 {}import 가능
//as는 rename의 의미
//router는 history 속성을 만들어줌

class App extends Component{
  render = ()=>{
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to='/'>home</Link></li>
              <li><Link to='/about'>about</Link></li>
              <li><Link to='/topics'>topics</Link></li>
            </ul>
            <hr/>
            <Route exact path ='/' component={home} />
            <Route path ='/about' component={about} />
            <Route path ='/topics' component={Topics}/>
          </div>
        </Router>
      </div>
    );
      
  };
};
//기본적으로 return에는 한개의 div로 전체 묶여야함
//hr은 한줄 긑기, exact는 정확히 이것만 ex[/, /a, /b 도 다 되는걸 /만 돌게]
export default App;
