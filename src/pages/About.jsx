import React from "react";

const About = () => {
  return (
    <div>
      <h2>About Page</h2>
      <p>
        In src folder There are two folders, Login and Product with style .css
        for login page.Then there is About page.A utils folder is created with
        common.js in it for setting token. In the App.js the routes are
        set.While creating the project the login api returns 401 so the
        credentials are hard coded and redirected to products page.And from
        products page an about link is given and is redirected to About page.
      </p>
    </div>
  );
};

export default About;
