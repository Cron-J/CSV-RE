import { Route }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import HomeView    from 'views/HomeView';
import PreviewPage from 'views/Preview.react';
import MappingView from 'views/Mapping.react';
import ImportFileView from 'views/Import.react';

export default (
    <Route component={CoreLayout}>
        <Route name='home' path='/' component={HomeView} />
        <Route name='preview' path='/preview' component={PreviewPage} />
        <Route name='mapping' path='/mapping' component={MappingView} />
        <Route name='importfile' path='/import' component={ImportFileView} />

    </Route>
);
