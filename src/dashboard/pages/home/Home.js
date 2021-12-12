import React , {useState , useEffect } from 'react'
import { Grid } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/topbar/Topbar'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {getAllusers} from '../../../server_api/Api'
import { useLocation } from 'react-router-dom'
// import Featured from '../../components/featutredInfo/FeaturedInfo'
// import WidgetSm from '../../components/widgetsSm/WidgetsSm'
// import WidgetLg from '../../components/widgetsLg/WidgetsLg'

const StoreDetails = styled.div`
    display: flex;
    margin-top: 100px;
    margin-left: 200px;
    flex-direction: column;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Users = styled.div`
    display : flex;
    margin-top: 20px
`;

const Text = styled.h6 `
    font-size:25px;
    font-weight: 700;
    color: #34495e
`;

const MiniText = styled.h6 `
    font-size: 25px;
    font-weight: 600;
    color: #d35400;
    margin-left: 20px
`;

const HeadText = styled.h6 `
    font-size:22px;
    font-weight: 700;
    color: #e74c3c;
    margin-left: 80px;
    margin-bottom: 30px
`;

const Home = () => {
    const location = useLocation();
    const [ totUsers , setUsers ] = useState(0);
    const { total } = useSelector(state => state.cart)
    const { orders } = useSelector(state => state.orderReducer)

    useEffect(() => {
        const getUsers = async() => {
            const {data} = await getAllusers();
            setUsers(data?.allFriends?.length)
        }
        getUsers();
    }, [location])
    return (
        <>
            <Navbar/>
            <Grid container  >
                  <Grid item xs={3}>
                    <Sidebar/>
                  </Grid>
                  <Grid item xs={9} style={{marginTop: '30px'}}>
                        {/* <Featured  /> */}
                            {/* <Charts data={chartData} title="User Analytics" grid={true} dataKey="Active users" /> */}
                            <Grid container style={{display: 'flex' , marginBottom: '20px'}}>
                                <Grid item xs={7}>
                                    <StoreDetails>
                                        <HeadText>*** New Updates *** </HeadText>
                                        <Users>
                                            <Text>Total New Users : </Text>
                                            <MiniText>{totUsers}</MiniText>
                                        </Users>
                                        <Users>
                                            <Text>Total New Orders : </Text>
                                            <MiniText>{orders?.length}</MiniText>
                                        </Users>
                                        <Users>
                                            <Text>Today's Sale : </Text>
                                            <MiniText>${total}</MiniText>
                                        </Users>
                                    </StoreDetails>
                                </Grid>
                            </Grid>
                  </Grid>
              </Grid>
        </>
    )
}

export default Home
