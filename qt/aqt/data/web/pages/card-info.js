/* Copyright: Ankitects Pty Ltd and contributors
 * License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html */

'use strict';

var anki = window.anki || {};
anki.setupCardInfo = function(container) {
    function displayCardInfo(info) {
        if (!info) {
            container.innerHTML = '<div class="card-info-placeholder">No card selected.</div>';
            return;
        }

        let html = '<table class="stats-table align-start"><tbody>';
        
        // Basic card info
        if (info.added) html += row('Added', new Date(info.added * 1000).toLocaleDateString());
        if (info.firstReview) html += row('First Review', new Date(info.firstReview * 1000).toLocaleDateString());
        if (info.latestReview) html += row('Latest Review', new Date(info.latestReview * 1000).toLocaleDateString());
        if (info.dueDate) html += row('Due Date', new Date(info.dueDate * 1000).toLocaleDateString());
        
        // Card stats
        if (info.interval) html += row('Interval', info.interval + ' days');
        if (info.ease) html += row('Ease', (info.ease / 10).toFixed(1) + '%');
        html += row('Reviews', info.reviews || 0);
        html += row('Lapses', info.lapses || 0);
        
        // Time stats
        if (info.averageSecs) html += row('Average Time', formatTime(info.averageSecs));
        if (info.totalSecs) html += row('Total Time', formatTime(info.totalSecs));
        
        // Card details
        html += row('Card Type', info.cardType || '');
        html += row('Note Type', info.notetype || '');
        html += row('Deck', info.deck || '');
        html += row('Card ID', info.cardId || '');
        html += row('Note ID', info.noteId || '');

        html += '</tbody></table>';
        
        container.innerHTML = html;
    }

    function row(label, value) {
        return `<tr><th class="align-start">${label}</th><td>${value}</td></tr>`;
    }

    function formatTime(secs) {
        if (secs < 60) return secs.toFixed(1) + 's';
        let mins = Math.floor(secs / 60);
        secs = Math.floor(secs % 60);
        return mins + 'm ' + secs + 's';
    }

    // Return a promise that will resolve with the component interface
    return Promise.resolve({
        $set: function(props) {
            displayCardInfo(props);
        }
    });
};