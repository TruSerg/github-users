import { memo } from "react";

import UserReposLayout from "./userReposLayout";

const UserRepos = ({
  userReposList,
  currentPage,
  setCurrentPage,
  paginate,
  reposPerPage,
  repos,
}) => {
  const indexOfLastRepo = currentPage * reposPerPage;

  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;

  const currentQuantityRepos = indexOfFirstRepo + 1 * userReposList.length;

  const totalPages = Math.ceil(repos / reposPerPage);

  return (
    <UserReposLayout
      indexOfFirstRepo={indexOfFirstRepo}
      userReposList={userReposList}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      paginate={paginate}
      currentQuantityRepos={currentQuantityRepos}
      totalPages={totalPages}
      repos={repos}
    />
  );
};

export default memo(UserRepos);
