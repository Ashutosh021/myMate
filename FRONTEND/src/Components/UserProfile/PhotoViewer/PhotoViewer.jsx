import "./PhotoViewer.css";
import defaultProfile from "/user.jpg";

const PhotoViewer = () => {
  return (
    <div className="p-2 text-center stickinprofilepage">
      <img src={defaultProfile} style={{width:'70%',borderRadius:'10%'}} alt="loading" />
      <br />
      <h3>Name</h3>

      <button className="btn btn-warning mt-1">Unfollow</button> <button className="btn btn-warning mt-1">Follow</button>
    </div>
  );
};

export default PhotoViewer;
