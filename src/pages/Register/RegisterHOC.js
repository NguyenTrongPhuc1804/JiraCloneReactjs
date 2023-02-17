import React from "react";

function RegisterHOC() {
  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Address 2</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default RegisterHOC;
