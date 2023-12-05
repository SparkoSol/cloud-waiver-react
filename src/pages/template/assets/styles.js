export const styles = `
  .container {
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .container-body {
    background: white;
    width: 50%;
    border-radius: 10px;
    padding: 10px 20px;
  }
  
  .btn {
    padding: 10px 20px;
    font-weight: bold;
    border-radius: 0.5rem;
    font-size: 15px;
  }
  
  .btn-blue {
    background: #1E429F;
    color: white;
    border: 1px solid transparent;
  }
  
  .btn-red {
    background: #9B1C1C;
    color: white;
    border: 1px solid transparent;
  }
  
  .btn-gray {
    background: #F3F4F6;
    color: black;
    border: 1px solid transparent;
  }
  
  .sign > div{
  border-width:1px
    border-color: #000;
  }
  
  .space-between{
  display:flex; justify-content:space-between; align-items:center;padding: 20px 0px 0px 0px  
  }
`;
