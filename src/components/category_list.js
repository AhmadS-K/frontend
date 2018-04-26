import React from 'react';
import { Link } from 'react-router-dom';

const CategoryListItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.fname}</td>
      <td className="col-md-3">{props.lname}</td>
      <td className="col-md-3">{props.date}</td>
      <td className="col-md-3 btn-toolbar">
        <Link to={`/categories/${props.id}/birthdays`}>
        <button className="btn btn-success btn-sm">
          <i className="glyphicon glyphicon-list"></i> Birthdays
        </button>
      </Link>
      <button className="btn btn-success btn-sm" onClick={event => props.onEdit("edit",props)}>
        <i className="glyphicon glyphicon-pencil"></i> Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
        <i className="glyphicon glyphicon-remove"></i> Delete
      </button>
    </td>
  </tr>
);
}

const CategoryList = (props) => {
  const categoryItems = props.categories.map((category)  => {
    return (
      <CategoryListItem
        fname={category.fname}
        lname={category.lname}
        date={category.date}
        id={category.id}
        key={category.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
    <div className="category-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">First Name</th>
            <th className="col-md-3">Last Name</th>
            <th className="col-md-3">Date</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryItems}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;