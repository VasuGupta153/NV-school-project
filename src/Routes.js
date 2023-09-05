import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./Components/HomeComponents/Home"
import Gallery from "./Components/GalleryComponents/Gallery";
import PrincipalPage from "./Components/PrincipalComponents/PrincipalPage";
import NoticePage from "./Components/NoticeComponents/NoticePage";
import StaffPage from "./Components/StaffComponents/StaffPage"
import SingleStaff from "./Components/StaffComponents/SingleStaff/SingleStaff";
import Contact from "./Components/ContactComponents/Contact";
import AdmissionPage from "./Components/AdmissionComponents/AdmissionPage";
import PhotosPage from "./Components/GalleryComponents/PhotoAlbums/PhotosPage/PhotosPage";
import UpdateAdmission from "./AdminComponents/AdmissionComponents/UpdateAdmission/UpdateAdmission";
import UpdateAcademic from "./AdminComponents/AcademicComponents/UpdateAcademic/UpdateAcademic";
import UpdateAbout from "./AdminComponents/AboutUsComponents/UpdateAbout/UpdateAbout";
import AboutUsPage from "./Components/AboutUsComponents/AboutUsPage";
import AcademicPage from "./Components/AcademicComponents/AcademicPage";
import LoginPage from "./AdminComponents/AuthComponents/LoginPage"
import AdminRoute from "./AdminComponents/AuthComponents/helper/AdminRoutes"
import AdminHome from "./AdminComponents/HomeComponents/Home";
import AdminNoticePage from "./AdminComponents/NoticeComponents/NoticePage";
import AdminAdmissionPage from "./AdminComponents/AdmissionComponents/AdmissionPage";
import AdminGallery from "./AdminComponents/GalleryComponents/Gallery";
import AdminPhotosPage from "./AdminComponents/GalleryComponents/PhotoAlbums/PhotosPage/PhotosPage";
import AdminStaffPage from "./AdminComponents/StaffComponents/StaffPage";
import AdminSingleStaff from "./AdminComponents/StaffComponents/SingleStaff/SingleStaff";
import AdminContact from "./AdminComponents/ContactComponents/Contact"
import AdminAboutUsPage from "./AdminComponents/AboutUsComponents/AboutUsPage";
import AdminAcademicPage from "./AdminComponents/AcademicComponents/AcademicPage";
import AdminPrincipalPage from "./AdminComponents/PrincipalComponents/PrincipalPage";
import ManageImageSlider from "./AdminComponents/HomeComponents/ImageSlider/ManageImageSlider/ManageImageSlider";
import AddPhoto from "./AdminComponents/HomeComponents/ImageSlider/ManageImageSlider/AddPhoto/AddPhoto";
import ManageFooterImageSlider from "./AdminComponents/HomeComponents/FooterImageSlider/ManageFooterImageSlider/ManageFooterImageSlider";
import AddFooterPhoto from "./AdminComponents/HomeComponents/FooterImageSlider/ManageFooterImageSlider/AddPhoto/AddFooterPhoto";
import ManageLetsGetInspired from "./AdminComponents/HomeComponents/LetsGetInspired/ManageLetsGetInspired/ManageLetsGetInspired";
import UpdateLetsGetInspired from "./AdminComponents/HomeComponents/LetsGetInspired/ManageLetsGetInspired/UpdateLetsGetInspired/UpdateLetsGetInspired";
import AddQuote from "./AdminComponents/HomeComponents/LetsGetInspired/ManageLetsGetInspired/AddQuote/AddQuote";
import UpdateNotice from "./AdminComponents/NoticeComponents/UpdateNotice/UpdateNotice";
import AddNotice from "./AdminComponents/NoticeComponents/AddNotice/AddNotice";
import UpdatePrincipal from "./AdminComponents/PrincipalComponents/UpdatePrincipal/UpdatePrincipal";
import UpdateAlbum from "./AdminComponents/GalleryComponents/UpdateAlbum/UpdateAlbum";
import AddAlbum from "./AdminComponents/GalleryComponents/AddAlbum/AddAlbum";
import AddAlbumPhoto from "./AdminComponents/GalleryComponents/AddPhoto/AddPhoto";
import AddAlbumVideo from "./AdminComponents/GalleryComponents/AddVideo/AddVideo";
import UpdateContact from "./AdminComponents/ContactComponents/UpdateContact/UpdateContact";
import UpdateStaff from "./AdminComponents/StaffComponents/UpdateStaff/UpdateStaff";
import AddStaff from "./AdminComponents/StaffComponents/AddStaff/AddStaff";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/gallery" exact component={Gallery} />
                <Route path="/principal" exact component={PrincipalPage} />
                <Route path="/notices" exact component={NoticePage} />
                <Route path="/staff" exact component={StaffPage} />
                <Route path="/staff/:staffId" exact component={SingleStaff} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/admission" exact component={AdmissionPage} />
                <Route path="/about" exact component={AboutUsPage} />
                <Route path="/academic" exact component={AcademicPage} />
                <Route path="/gallery/:albumName/:albumId/photos" exact component={PhotosPage} />
                <Route path="/login" exact component={LoginPage} />
                <AdminRoute path="/admin" exact component={AdminHome} />
                <AdminRoute path="/admin/notices" exact component={AdminNoticePage} />
                <AdminRoute path="/admin/admission" exact component={AdminAdmissionPage} />
                <AdminRoute path="/admin/gallery" exact component={AdminGallery} />
                <AdminRoute path="/admin/gallery/:albumName/:albumId/photos" exact component={AdminPhotosPage} />
                <AdminRoute path="/admin/staff" exact component={AdminStaffPage} />
                <AdminRoute path="/admin/staff/:staffId" exact component={AdminSingleStaff} />
                <AdminRoute path="/admin/contact" exact component={AdminContact} />
                <AdminRoute path="/admin/about" exact component={AdminAboutUsPage} />
                <AdminRoute path="/admin/academic" exact component={AdminAcademicPage} />
                <AdminRoute path="/admin/principal" exact component={AdminPrincipalPage} />
                <AdminRoute path="/admin/managesliderphotos" exact component={ManageImageSlider} />
                <AdminRoute path="/admin/managesliderphotos/addphoto" exact component={AddPhoto} />
                <AdminRoute path="/admin/managefootersliderphotos" exact component={ManageFooterImageSlider} />
                <AdminRoute path="/admin/managefootersliderphotos/addphoto" exact component={AddFooterPhoto} />
                <AdminRoute path="/admin/manageletsgetinspired" exact component={ManageLetsGetInspired} />
                <AdminRoute path="/admin/letsgetinspired/create" exact component={AddQuote} />
                <AdminRoute path="/admin/letsgetinspired/update/:letsgetinspiredId" exact component={UpdateLetsGetInspired} />
                <AdminRoute path="/admin/notice/update/:noticeId" exact component={UpdateNotice} />
                <AdminRoute path="/admin/notice/create" exact component={AddNotice} />
                <AdminRoute path="/admin/principal/update/:principalId" exact component={UpdatePrincipal} />
                <AdminRoute path="/admin/album/update/:albumId" exact component={UpdateAlbum} />
                <AdminRoute path="/admin/album/create" exact component={AddAlbum} />
                <AdminRoute path="/admin/photo/create" exact component={AddAlbumPhoto} />
                <AdminRoute path="/admin/video/create" exact component={AddAlbumVideo} />
                <AdminRoute path="/admin/contact/update/:contactId" exact component={UpdateContact} />
                <AdminRoute path="/admin/staff/update/:staffId" exact component={UpdateStaff} />
                <AdminRoute path="/admin/staffs/create" exact component={AddStaff} />
                <AdminRoute path="/admin/admission/update" exact component={UpdateAdmission} />
                <AdminRoute path="/admin/academic/update" exact component={UpdateAcademic} />
                <AdminRoute path="/admin/about/update" exact component={UpdateAbout} />
            </Switch>
        </BrowserRouter>
    )
}
 
export default Routes;