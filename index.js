const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const app = express();
const querystring = require('querystring');
const fs = require('fs');

const spotiSetting = require("./oAuth.json");
spotiSetting.scope = generateRandomString(16);
const spotifyApi = new SpotifyWebApi({
    clientId: spotiSetting.client_id,
    clientSecret: spotiSetting.client_secret,
    redirectUri: spotiSetting.redirect_uri,
    accessToken: spotiSetting.access_token || '',
    refreshToken: spotiSetting.refresh_token || ''
});


function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

async function main() {
    app.listen(8080, function () {
        console.log('Server listening on port 8080');
        const authorizeURL = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: spotiSetting.client_id,
            scope: spotiSetting.scopes.join(' '),
            redirect_uri: spotiSetting.redirect_uri,
            state: spotiSetting.state
        });
        //write on console with color
        console.log('\x1b[36m%s\x1b[0m', 'Please open this link in your browser:');
        console.log('\x1b[33m%s\x1b[0m', authorizeURL);
    });

    
    
    let getAccessToken = await new Promise((resolve, reject) => {
        app.get('/callback', async function (req, res) {
            let code = req.query.code || null;
            let state = req.query.state || null;
            let data = await spotifyApi.authorizationCodeGrant(code);
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);
            spotiSetting.access_token = data.body['access_token'];
            spotiSetting.refresh_token = data.body['refresh_token'];
            res.send('Login success, you can close this tab now!');
            resolve();
        })
    });

    await spotifyApi.setAccessToken(spotiSetting.access_token);
    await spotifyApi.setRefreshToken(spotiSetting.refresh_token);

    console.log("Login success!")
    //press enter to continue
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    //color it in yellow
    console.log('\x1b[33m%s\x1b[0m', "Press Enter to continue...");
    await new Promise(resolve => process.stdin.once('data', resolve));


    let playlists = (await spotifyApi.getUserPlaylists()).body.items;

    while (true) {

        console.log("You have " + playlists.length + " playlists");
        playlists.forEach((playlist, index) => {
            console.log(index + ":\t " + playlist.name + " \t "+ playlist.id);
        });

        //pick a number:
        //color it in yellow
        console.log('\x1b[33m%s\x1b[0m', "Pick a number:");
        let playlistIndex = await new Promise(resolve => process.stdin.once('data', resolve));
        playlistIndex = parseInt(playlistIndex);

        let playlist = playlists[playlistIndex];
        let playlistTracks = (await spotifyApi.getPlaylistTracks(playlist.id)).body.items;
        console.log("You have " + playlistTracks.length + " tracks in this playlist");
        playlistTracks.forEach((track, index) => {
            console.log(index + ":\t " + track.track.name + " \t "+ track.track.id);
        });
        console.log("Liking all tracks in this playlist...");
        await spotifyApi.addToMySavedTracks(playlistTracks.map(track => track.track.id));
        console.log("Done!");
        console.log('\x1b[33m%s\x1b[0m', "Continue? (y/n)");
        let answer = await new Promise(resolve => process.stdin.once('data', resolve));
        if (answer.trim() != "y") {
            console.log('\x1b[35m%s\x1b[0m', "Bye!");
            process.exit();
        }
    }
}

main();