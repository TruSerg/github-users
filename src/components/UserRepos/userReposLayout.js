import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";

import Pagination from "../../commonComponents/Pagination/pagination";
import RepositoriesIsEmptyArea from "../../commonComponents/RepositoriesIsEmptyArea/repositoriesIsEmptyArea";

import styles from "./styles";

const UserReposLayout = ({
  classes,
  indexOfFirstRepo,
  userReposList,
  currentQuantityRepos,
  setCurrentPage,
  totalPages,
  repos,
}) => {
  return (
    <div className={classes.reposWrapper}>
      {repos ? (
        <>
          <h3 className={classes.reposTitle}>Repositories ({repos})</h3>
          {userReposList.map(({ id, name, description, html_url }) => {
            return (
              <div className={classes.userRepo} key={id}>
                <a target="_blank" rel="noreferrer" href={html_url}>
                  <p className={classes.repoName}>{name}</p>
                </a>
                <p className={classes.repoDescription}>{description}</p>
              </div>
            );
          })}
          {repos > 4 && (
            <div className={classes.paginationArea}>
              <span className={classes.paginationData}>{`${
                indexOfFirstRepo + 1
              } - ${currentQuantityRepos} of ${repos} items`}</span>
              <Pagination pages={totalPages} currentPage={setCurrentPage} />
            </div>
          )}
        </>
      ) : (
        <RepositoriesIsEmptyArea />
      )}
    </div>
  );
};

UserReposLayout.propTypes = {
  userReposList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      login: PropTypes.string,
      url: PropTypes.string,
      avatar: PropTypes.string,
      followers: PropTypes.number,
      following: PropTypes.number,
    })
  ),
  indexOfFirstRepo: PropTypes.number.isRequired,
  currentQuantityRepos: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  repos: PropTypes.number,
};

export default withStyles(styles)(UserReposLayout);
