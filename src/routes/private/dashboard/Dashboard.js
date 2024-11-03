import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaces, setSelectedWorkspaceId } from '../../../redux/slices/workspaceSlice';
import CreateWorkspaceModal from './modals/CreateWorkspaceModal';
import Workspace from '../../../components/workspaces/Workspace';
import Navbar from '../../../components/nav/Navbar';
import socket from '../../../socket';

const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #121212;
  color: #ecf0f1;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const DefaultDashboard = styled.div`
  display: ${({ show }) => (show ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const WorkspaceCard = styled.div`
  background-color: #1a1a1a;
  color: #ecf0f1;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

function Dashboard() {
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspace.workspaces);
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const error = useSelector((state) => state.workspace.error);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [navbarMinimized, setNavbarMinimized] = React.useState(false);

  useEffect(() => {
    dispatch(fetchWorkspaces());
    socket.on('updateWorkspaces', (data) => {
      dispatch(fetchWorkspaces());
    });
    return () => {
      socket.off('updateWorkspaces');
    };
  }, [dispatch]);

  const handleWorkspaceSelect = (workspaceId) => {
    dispatch(setSelectedWorkspaceId(workspaceId));
    setNavbarMinimized(false);
  };

  return (
    <DashboardContainer>
      {selectedWorkspaceId ? (
        <ContentContainer>
          <Navbar
            minimized={navbarMinimized}
            setMinimized={setNavbarMinimized}
            workspaces={workspaces}
            onWorkspaceSelect={handleWorkspaceSelect}
            onCreate={() => setShowCreateModal(true)}
          />
          <Workspace
            workspaceId={selectedWorkspaceId}
            workspaces={workspaces}
            minimized={navbarMinimized}
          />
        </ContentContainer>
      ) : (
        <DefaultDashboard>
          <h1>TaskSmart</h1>
          <h1>Welcome to Your Dashboard</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>Select or create a workspace to start organizing your tasks.</p>
          <div>
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                onClick={() => handleWorkspaceSelect(workspace.id)}
              >
                {workspace.name}
              </WorkspaceCard>
            ))}
          </div>
        </DefaultDashboard>
      )}

      {showCreateModal && (
        <CreateWorkspaceModal
          onClose={() => setShowCreateModal(false)}
          onCreate={() => dispatch(fetchWorkspaces())}
        />
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
