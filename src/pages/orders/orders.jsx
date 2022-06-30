import styles from './orders.module.css';

import ProfileNav from '../../components/profile-nav/profile-nav';

const Orders = () => {
    return (
        <div className={styles.container}>
            <ProfileNav />
        </div>
    );
};

export default Orders;