import React from "react";
import NavBar from '../../components/NavBar/';
// import { ReactDOM } from "react";
import './index.css'

const ImgUpload =({
    onChange,
    src,
  })=>{
    return(
      <label for="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <img className="imgphoto" alt ="imagem de perfil" for="photo-upload" src={src}/>
        </div>
        <input className='inputphoto' id="photo-upload" type="file" onChange={onChange}/> 
      </label>
    );
  }
  const Name =({
    onChange,
    value
  })=>{
    return(
      <div className="field">
        <span>
          name:
        </span>
        <input type="text" onChange={onChange} maxlength="25" value={value} placeholder="Alexa" required/> 
      </div>
    );
  }
  const Status =({
    onChange,
    value
  })=>{
    return(
      <div className="field">
        <span>
          status:
        </span>
        <input type="text" onChange={onChange} maxlength="35" value={value}placeholder="It's a nice day!" required/> 
      </div>
    );
  }
  const Profile =({
    onSubmit,
    src,
    name,
    status,
  })=>{
    return(
     <div className="card">
      <form onSubmit={onSubmit}>
        <h1>Profile Card</h1>
        <label className="custom-file-upload fas">
          <div className="img-wrap" >
            <img className="imgphoto" alt="imagem de perfil" for="photo-upload" src={src}/>
          </div>
        </label>
        <div className="name">{name}</div>
        <div className="status">{status}</div>
        <button type="submit" className="edit">Edit Profile </button>
      </form>
     </div>
    );
  }
        
  const Edit =({
    onSubmit,
    children,
  })=>{
    return(
      <div className="card">
        <form onSubmit={onSubmit}>
          <h1>Profile Card</h1>
          {children}
          <button type="submit" className="save">Save </button>
        </form>
      </div>
    );
  }
  
  class CardProfile extends React.Component {
    constructor(props) {
      super(props);
       this.state = {
         file: '',
         imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
         name:'',
         status:'',
         active: 'edit'
      };
    }
    photoUpload (e) {
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
    }
    editName (e) {
      const name = e.target.value;
      this.setState({
        name,
      });
    }
    editStatus (e) {
      const status = e.target.value;
      this.setState({
        status,
      });
    }
    handleSubmit(e) {
      e.preventDefault();
      let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
      this.setState({
        active: activeP,
      })
    }
    
    render() {
      const {imagePreviewUrl, 
             name, 
             status, 
             active} = this.state;
      return (
        <div>
            <NavBar/>
          {(active !== 'edit')  
            ?<Edit onSubmit={(e)=>this.handleSubmit(e)}>
                <ImgUpload onChange={(e)=>this.photoUpload(e)} src={imagePreviewUrl}/>
                <Name onChange={(e)=>this.editName(e)} value={name}/>
                <Status onChange={(e)=>this.editStatus(e)} value={status}/>
              </Edit>
            :<Profile onSubmit={(e)=>this.handleSubmit(e)} src={imagePreviewUrl} name={name} status={status}/>}
          
        </div>
      )
    }
  }
  
export default CardProfile;
