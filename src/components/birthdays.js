import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//const API_BASE = 'http://localhost:3000/';
const API_BASE = "http://localhost:3000";
const BirthdayItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.title}</td>
      <td className="col-md-3">{props.article}</td>
      <td className="col-md-3 btn-toolbar">
        <Link to={`/categories/${props.category_id}/birthdays/${props.id}`}>
            <button className="btn btn-success btn-sm">
              <i className="glyphicon glyphicon-pencil"></i> Edit
            </button>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  );
}

class Birthdays extends React.Component {

  constructor(props) {
    super(props);
    const id = props.match.params.id;
    this.state = {
      birthdays: [],
      category_id: id,
      category: {}
    };

    this.loadBirthdays = this.loadBirthdays.bind(this);
    this.deleteBirthday = this.deleteBirthday.bind(this);
  }

  loadBirthdays() {
    axios
    .get(`${API_BASE}/categories/${this.state.category_id}/birthdays`)
    .then(res => {
      this.setState({ birthdays: res.data });
      console.log(`Data loaded! = ${this.state.birthdays}`)
    })
    .catch(err => console.log(err));

    axios
    .get(`${API_BASE}/categories/${this.state.category_id}`)
    .then(res => {
      this.setState({ category: res.data });
      console.log(`Data loaded! = ${this.state.birthdays}`)
    })
    .catch(err => console.log(err));
  }

  deleteBirthday(id) {
    let filteredArray = this.state.birthdays.filter(item => item.id !== id)
    this.setState({birthdays: filteredArray});
    axios
    .delete(`${API_BASE}/categories/${this.state.category_id}/birthdays/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('Birthdays mounted!')
    this.loadBirthdays();
  }

  render() {

    const birthdayItems = this.state.birthdays.map((birthday)  => {
      return (
        <BirthdayItem
          title={birthday.title}
          article={birthday.article}
          category_id = {birthday.category_id}
          id={birthday.id}
          key={birthday.id}
          onDelete={this.deleteBirthday}
        />
      )
    });

    const headerString = (this.state.birthdays.count === 0)
      ? "Loading..." : `Birthdays by ${this.state.category.fname} ${this.state.category.lname}`
    return (
      <div className="birthdays">
        <h1> {headerString} </h1>
        <div className="category-list">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col-md-3">Title</th>
                <th className="col-md-3">Article</th>
              </tr>
            </thead>
            <tbody>
              {birthdayItems}
            </tbody>
          </table>
          <Link to={`/categories/${this.state.category_id}/birthdays/create`}>
              <button className="btn btn-success btn-sm">
                <i className="glyphicon glyphicon-plus"></i> Create
              </button>
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => this.props.history.goBack()}>
            <i className="glyphicon glyphicon-menu-left"></i> Back
          </button>
        </div>
      </div>
    );
  }
}

export default Birthdays;