var React = require('react');
var DefaultLayout = require('./layout');
var Navbar = require('./navbar');
var UserList = require('./userlist');
var PostList = require('./postlist');

var Help = React.createClass({
    render : function () {
        return (
            <DefaultLayout title={this.props.title}>
                <Navbar usernow={this.props.usernow} />
                <h2 className="ui header" style={{margin: 'auto', width: '400px'}}>HelpUserList</h2>
                <h3 className="ui header" style={{margin: 'auto', width: '400px'}}>
                    We Need  Help!
                </h3>
                <div className="ui divider"></div>
                <UserList data={this.props.users} />
            </DefaultLayout>
        );
    }
});

module.exports = Help;