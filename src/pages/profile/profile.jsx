import styles from './profile.module.css';

import ProfileNav from '../../components/profile-nav/profile-nav';
import ProfileForm from '../../components/profile-form/profile-form';

const Profile = () => {
    return (
        <div className={styles.container}>
            <ProfileNav />
            <ProfileForm />
        </div>
    );
};

export default Profile;