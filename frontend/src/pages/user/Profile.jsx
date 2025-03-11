import { useUser } from "../../context/UserContext"; // Import useUser from context

const Profile = () => {
  const { currentUser } = useUser();

  return (
    <main>
      <h2>Profile</h2>
      {!currentUser ? (
        <p>Loading your profile...</p>
      ) : (
        <>
          <p>
            <strong>Username:</strong> {currentUser.username}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
        </>
      )}
    </main>
  );
};

export default Profile;
