import Footer from "./Footer";
interface ProfileProps {
  name: string;
  title: string;
  imageSrc: string;
}


export function Profile({ name, title, imageSrc }: ProfileProps) {
  return (
    <div className="profile-container">
      <img src={imageSrc} className="profile-image"/>
      <div className="profile-text">
        <h3 className="profile-name text-neutral-100">{name}</h3>
        <h5 className="profile-title text-primary-200">{title}</h5>
        <p className="text-neutral-400"> web ml data</p>
        <Footer />
      </div>
    </div>
  )
}

export default Profile;
