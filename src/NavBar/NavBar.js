/**
 * External dependencies
 */
import $ from 'jquery';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { select, dispatch } from '.@/global-store';
import { IconTimes } from '.@/Icons';

const closeWindow = ( e ) => {
    e.preventDefault();
    $( 'body' ).removeClass( 'wp-console-active' );
    $( '#wp-console' ).removeClass( 'active' ).trigger( 'wp-console:close' );
};

const NavBar = () => {
    const { panels, activePanel, activePanelId } = select();
    const { setActivePanelId } = dispatch();

    const PanelButtons = activePanel.PanelButtons;

    return (
        <nav id="wp-console-navbar" className="display-flex">
            <div className="wp-console-navbar-left display-flex">
                <h3 id="wp-console-logo" className="align-self-center">
                    { __( 'WP Console', 'wp-console' ) }
                </h3>

                <ul id="wp-console-panel-names" className="display-flex">
                    { panels.map( ( panel ) => (
                        <li
                            key={ panel.id }
                            role="presentation"
                            className={ activePanelId === panel.id ? 'active' : '' }
                            onClick={ () => setActivePanelId( panel.id ) }
                        >{ panel.icon } { panel.name }</li>
                    ) ) }
                </ul>
            </div>
            <div className="wp-console-navbar-right display-flex">
                <div className="wp-console-panel-buttons align-self-center">
                    <PanelButtons />
                </div>
                <div className="wp-console-nav-buttons align-self-center">
                    <Button className="button-close" onClick={ closeWindow }>
                        <IconTimes />
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;