import React from "react";
import { useParams } from "react-router-dom";
import '../Info.css'; // נוסיף את שורת הייבוא הזו כדי להשתמש בקובץ ה-CSS

function Info() {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    
    return (
      <div>
        <h1>{user.name}</h1>
        <table className="info-table">
          <tbody>
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                {user.address.street}, {user.address.suite}, {user.address.city},{" "}
                {user.address.zipcode}
              </td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>{user.website}</td>
            </tr>
            <tr>
              <td>Company</td>
              <td>{user.company.name}</td>
            </tr>
            <tr>
              <td>Catch Phrase</td>
              <td>{user.company.catchPhrase}</td>
            </tr>
            <tr>
              <td>BS</td>
              <td>{user.company.bs}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default Info;
