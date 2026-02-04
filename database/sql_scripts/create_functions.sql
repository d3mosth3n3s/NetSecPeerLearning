-- Leaving as an example

SET client_min_messages TO WARNING;

-- Users functions
\i 'sql_scripts/functions/users/create_user.sql'
\i 'sql_scripts/functions/users/get_user.sql'
\i 'sql_scripts/functions/users/update_user.sql'
\i 'sql_scripts/functions/users/delete_user.sql'

-- Listings functions
\i 'sql_scripts/functions/listings/create_listing.sql'
\i 'sql_scripts/functions/listings/get_listing.sql'
\i 'sql_scripts/functions/listings/update_listing.sql'
\i 'sql_scripts/functions/listings/delete_listing.sql'

-- History functions
\i 'sql_scripts/functions/history/create_history.sql'
\i 'sql_scripts/functions/history/get_history.sql'
\i 'sql_scripts/functions/history/delete_history.sql'

-- Recommended functions
\i 'sql_scripts/functions/recommended/create_recommended.sql'
\i 'sql_scripts/functions/recommended/get_recommended.sql'
\i 'sql_scripts/functions/recommended/delete_recommended.sql'

-- Watchlist functions
\i 'sql_scripts/functions/watchlist/create_watchlist.sql'
\i 'sql_scripts/functions/watchlist/get_watchlist.sql'
\i 'sql_scripts/functions/watchlist/delete_watchlist.sql'