import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Toolbar } from 'primereact/toolbar';

function MainPage() {
  return (
    <>
      <div>
        <h1>Panel Menu</h1>
        <Sidebar position="left"></Sidebar>
      </div>
      <div>
        <h1>Toolbar</h1>
        <Toolbar></Toolbar>
      </div>
    </>
  );
}

export default MainPage;