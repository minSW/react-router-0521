import React from 'react';
import {Link,Route} from 'react-router-dom';

//기본은 props고 {match}는 프롭스 안에 match만 가져오겠다는 의미
const Topic = ({match}) => (
    <div>
    {match.params.name}
    Topic
    </div>
    )
//밑에서 저장한 변수는  match안에 params안에 변수로 저장됨.
const Empty = () => (
  <div>
  Empty
  </div>
  )

const Topics = ({match}) => (
    <div>
      Topics
      <ul>
        <li><Link to = {match.url+'/first'}>first</Link></li>
        <li><Link to = {match.url+'/second'}>second</Link></li>
        <li><Link to = {match.url+'/third'}>third</Link></li>
      </ul>
      <hr/>
      <Route exact path={match.url} component = {Empty} />
      <Route path = {match.url+'/:name'} component = {Topic} />
    </div>
    );

export default Topics;
//:name은 url을 name이라는 이름의 변수에 저장하는 행위
