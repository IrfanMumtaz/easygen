/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React example components
import { IconButton } from '@mui/material';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutInit } from 'Store/state/Auth/Logout';

function Dashboard() {
    const navigate = useNavigate();
    const dispatchAction = useDispatch();

    const logoutHelper = () => {
        const token = localStorage.getItem('access_token');
        let obj = {
            Authorization: `${token}`,
        };
        dispatchAction(logoutInit({ data: obj, navigate: navigate }));
    };

    return (
        <DashboardLayout>
            <IconButton size="small" disableRipple onClick={logoutHelper}>
                <MDTypography
                    variant="button"
                    fontWeight="medium"
                    color="warning">
                    Logout
                </MDTypography>
            </IconButton>
        </DashboardLayout>
    );
}

export default Dashboard;
