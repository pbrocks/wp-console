/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import withSelectDispatch from '../store/with-select-dispatch';
import {
    IconPlay,
    IconSplitWindowHorizontal,
    IconSplitWindowVertical,
} from '.@/Icons';
import executeCode from './executeCode';

const PanelButtons = ( props ) => {
    const {
        userSettings,
        code,
        isExecuting,
        setUserSettings,
        setNotice,
    } = props;

    const windowSplit = userSettings.console.window_split;
    const newSplitSetting =
        windowSplit === 'horizontal' ? 'vertical' : 'horizontal';
    const IconSplit =
        windowSplit === 'horizontal'
            ? IconSplitWindowHorizontal
            : IconSplitWindowVertical;

    return (
        <ul className="list-inline">
            <li className="list-inline-item">
                <Button
                    className="wp-console-panel-button wp-console-button-no-style"
                    isSmall
                    onClick={ () =>
                        setUserSettings(
                            'console',
                            'window_split',
                            newSplitSetting,
                            setNotice
                        )
                    }
                >
                    <IconSplit /> { __( 'Split', 'wp-console' ) }
                </Button>
            </li>
            <li className="list-inline-item">
                <Button
                    className="wp-console-panel-button wp-console-button-no-style"
                    isSmall
                    isBusy={ isExecuting }
                    disabled={ isExecuting }
                    onClick={ () => executeCode( code, props ) }
                >
                    <IconPlay /> { __( 'Run', 'wp-console' ) }
                </Button>
            </li>
        </ul>
    );
};

export default withSelectDispatch( {
    select: [ 'userSettings', 'code', 'isExecuting' ],

    dispatch: [
        'setUserSettings',
        'setNotice',
        'setOutput',
        'setDump',
        'setErrorTrace',
        'resetConsoleResponses',
        'startExecuting',
        'finishExecuting',
    ],
} )( PanelButtons );
