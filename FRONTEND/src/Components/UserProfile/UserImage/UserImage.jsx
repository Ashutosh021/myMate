import defaultProfile from '/user.jpg';
import "./UserImage.css";

const UserImage = ({user}) => {
  return (
    <div className="photo-viewer">
      <img src={user.profilePic} style={{ width: '70%', borderRadius: '10%' }} alt="Profile" />
      <h3>{user.name}</h3>
      <button className="btn btn-warning mt-1">Unfollow</button>
      <button className="btn btn-warning mt-1">Follow</button>
    </div>
  );
};

export default UserImage;