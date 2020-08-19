import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: `${theme.spacing(2)}px 0`,
    },
  },
}));

type SettingsProps = {
  blockchain: any;
};

const Settings: React.FC<SettingsProps> = ({ blockchain }) => {
  const classes = useStyles();
  const [difficulty, setDifficulty] = useState(blockchain.difficulty);
  const [miningReward, setMiningReward] = useState(blockchain.miningReward);

  useEffect(() => {
    setDifficulty(blockchain.difficulty);
    setMiningReward(blockchain.miningReward);
  }, [blockchain]);

  return (
    <section>
      <Typography component="header" variant="h4">
        Settings
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          fullWidth
          id="difficulty"
          label="Difficulty"
          onChange={(evt) => {
            // TODO: change blockchain to a reducer
            blockchain.difficulty = evt.target.value;
            setDifficulty(evt.target.value);
          }}
          type="number"
          value={difficulty}
          variant="outlined"
        />
        <TextField
          fullWidth
          id="mining-reward"
          label="Mining Reward"
          onChange={(evt) => {
            blockchain.miningReward = evt.target.value;
            setMiningReward(evt.target.value);
          }}
          type="number"
          value={miningReward}
          variant="outlined"
        />
      </form>
    </section>
  );
};
export default Settings;
