const USERS = '/api/v1/users';
const NEXTCLOUD = '/api/v1/nextcloud';
const REPORTS = '/api/v1/reports';

export const ENDPOINTS = {
    login: USERS + '/login',
    getTemplates: NEXTCLOUD + '/files',
    downloadTemplate: NEXTCLOUD + '/files/download',
    generateAndDownload: REPORTS + '/generateForWeb',
    previewForWeb: REPORTS + '/previewForWeb',
    getReports: REPORTS + '/getReports'
}