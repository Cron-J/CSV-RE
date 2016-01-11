import { Route }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import HomeView    from 'views/homeView.react';
import EditMappingView  from 'views/EditMapping';

export default (
    <Route component={CoreLayout}>
        <Route name='home' path='/' component={HomeView} />
        <Route name='edit' path='/editmapping' component={EditMappingView} />
        <Route name='editmapping' path='/mapping/edit/:id' component={HomeView} />
    </Route>
);
