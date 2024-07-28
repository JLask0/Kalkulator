import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const CommentList = ({ name, text, surname }) => {


  const generateColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const avatarColor = generateColorFromName(name || '');

  const calculateCommentWidth = (text) => {
    let baseWidth = 200;

    let dynamicWidth = baseWidth + text.length * 5;

    let maxWidth = 600;
    dynamicWidth = Math.min(dynamicWidth, maxWidth);

    return dynamicWidth;
  };

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        <ListItem
          alignItems="flex-start"
          style={{
            backgroundColor: '#e1e2e3',
            padding: '15px',
            borderRadius: '10px',
            width: calculateCommentWidth(text) + 'px',
            overflow: 'hidden',
            wordWrap: 'break-word',
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: avatarColor }} aria-label="recipe" title="zarządzaj kontem">
              {name && name.charAt(0)}{surname && surname.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText

            primary={name}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {text}
                </Typography>
              </>
            }
          />
        </ListItem>
      </List>
    </>
  );


}

export default CommentList;