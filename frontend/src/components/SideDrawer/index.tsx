import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { StyleRulesCallback, WithStyles, withStyles } from '@material-ui/core/styles';
import ListButton from '../ListButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FilesFolder from '../../containers/FilesFolder';

const styles: StyleRulesCallback = theme => ({
    drawerPaper: {
        position: 'relative',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        overflow: 'hidden'
    },
    toolbar: theme.mixins.toolbar,
    noBorder: {
        borderRight: 'none'
    }
});

type Styles = 'drawerPaper' | 'toolbar' | 'noBorder';

const SideDrawer: React.StatelessComponent<WithStyles<Styles>> = (
    { classes }
) => (
        <Drawer
            variant="permanent"
            anchor="left"
            classes={{
                paper: classes.drawerPaper,
                paperAnchorDockedLeft: classes.noBorder
            }}
        >
            <div className={classes.toolbar} style={{minHeight: '48px'}}/>
            {/* Setting toolbar is so hacky, I don't know how to override it */}
            <List dense>
                <FilesFolder />
            </List>
            <List dense>
                <ListButton
                    icon={<StarBorderIcon />}
                    text="CS 220"
                />
            </List>
        </Drawer>
    );

export default withStyles(styles)(SideDrawer);