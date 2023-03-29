import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import moment from 'moment';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useDispatch, useSelector } from "react-redux";
import { insertDecimal } from "../../utils/helpers";
import { getAllTransactions } from "../../redux/actions/Data";

const Dashboard = () => {
  const dispatch = useDispatch()
  let { members, totalMembershipFund, totalDirectReferral } = useSelector(({dataReducer}) => dataReducer);
  const [listData, setListData] = useState([]);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


const handleSort = () => {
  let newMembers =  members;
  let mems = [];
  let totalFund = totalMembershipFund + totalDirectReferral;
  
  
  newMembers.sort((a, b) => a.createdAt - b.createdAt)
    newMembers.forEach(a => {
      if(totalFund >= 500 && a.status !== 'activated'){
        totalFund -= 500;
        mems.push({...a, status: 'activated'});
      } else {
        mems.push(a)
      }
    })
  
  console.log(newMembers)
  setListData(mems)
}

const handleTransactions = () => {
  dispatch(getAllTransactions())
}


useEffect(() => {
  handleSort();
  handleTransactions()
}, [members])

  let memFund = (totalMembershipFund - (Math.floor((totalMembershipFund / 499)) * 499)) 

  console.log(memFund / 499)
  console.log(memFund)

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`$${totalMembershipFund}`}
            subtitle={<Box>Members Fund <strong>({members.length})</strong></Box>}
            progress={memFund / 499}
            increase={`${insertDecimal((memFund / 499) * 100)}%`}
            icon={
              <GroupAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`$${totalDirectReferral}`}
            subtitle="Direct Referral"
            // progress="0.80"
            // increase="+43%"
            icon={
              <Diversity3Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

   
        <Box
          gridColumn="span 12"
          gridRow="span 12"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          height="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {listData.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box flexGrow={1}>
                <Typography color={colors.grey[100]}>
                  {transaction.firstName} {transaction.lastName}
                </Typography>
                <strong>{String(transaction.rank).toUpperCase()}</strong> <em>({String(transaction.status).toUpperCase()})</em>
              </Box>
              <Box color={colors.grey[100]}></Box>
              <Box
                // backgroundColor={colors.greenAccent[500]}
                // p="5px 10px"
                // borderRadius="4px"
                color={colors.grey[100]}
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                justifyContent="center"
              >
                 <strong>${insertDecimal(transaction.membershipFee)}</strong>
                 <em>{moment(transaction.createdAt).format('L')}</em>
              </Box>
            </Box>
          ))}
        </Box>

      
      </Box>
    </Box>
  );
};

export default Dashboard;
