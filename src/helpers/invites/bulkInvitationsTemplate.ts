export const downloadBulkInvitationsUploadTemplate = (): string => {
  let url = `${process.env.REACT_APP_APP_URL}/api/invites/export/bulk-template`;

  return url;
};
