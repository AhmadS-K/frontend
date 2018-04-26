import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './components/categories';
import Birthdays from './components/birthdays';
import BirthdayForm from './components/birthday_form';
import Home from './components/home';
import About from './components/about';
import TopNav from './components/top_nav';
import Footer from './components/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';


ReactDOM.render(
  <BrowserRouter>
    <div>
      <TopNav />
      <Switch>
        <Route path="/categories/:id/birthdays/create" component={BirthdayForm} />
        <Route path="/categories/:id/birthdays/:pid" component={BirthdayForm} />
        <Route path="/categories/:id/birthdays" component={Birthdays} />
        <Route path="/categories" component={Categories} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();