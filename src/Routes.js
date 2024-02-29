import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/HomeComponents/Home";
import Gallery from "./Components/GalleryComponents/Gallery";
import PrincipalPage from "./Components/PrincipalComponents/PrincipalPage";
import NoticePage from "./Components/NoticeComponents/NoticePage";
import StaffPage from "./Components/StaffComponents/StaffPage";
import SingleStaff from "./Components/StaffComponents/SingleStaff/SingleStaff";
import Contact from "./Components/ContactComponents/Contact";
import AdmissionPage from "./Components/AdmissionComponents/AdmissionPage";
import PhotosPage from "./Components/GalleryComponents/PhotoAlbums/PhotosPage/PhotosPage";
import UpdateAdmission from "./AdminComponents/AdmissionComponents/UpdateAdmission/UpdateAdmission";
import UpdateAcademic from "./AdminComponents/AcademicComponents/UpdateAcademic/UpdateAcademic";
import UpdateAbout from "./AdminComponents/AboutUsComponents/UpdateAbout/UpdateAbout";
import AboutUsPage from "./Components/AboutUsComponents/AboutUsPage";
import AcademicPage from "./Components/AcademicComponents/AcademicPage";
import LoginPage from "./AdminComponents/AuthComponents/LoginPage";
import AdminHome from "./AdminComponents/HomeComponents/Home";
import AdminNoticePage from "./AdminComponents/NoticeComponents/NoticePage";
import AdminAdmissionPage from "./AdminComponents/AdmissionComponents/AdmissionPage";
import AdminGallery from "./AdminComponents/GalleryComponents/Gallery";
import AdminPhotosPage from "./AdminComponents/GalleryComponents/PhotoAlbums/PhotosPage/PhotosPage";
import AdminStaffPage from "./AdminComponents/StaffComponents/StaffPage";
import AdminSingleStaff from "./AdminComponents/StaffComponents/SingleStaff/SingleStaff";
import AdminContact from "./AdminComponents/ContactComponents/Contact";
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

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/principal" element={<PrincipalPage />} />
        <Route path="/notices" element={<NoticePage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/:staffId" element={<SingleStaff />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admission" element={<AdmissionPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/academic" element={<AcademicPage />} />
        <Route path="/gallery/:albumName/:albumId/photos" element={<PhotosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/notices" element={<AdminNoticePage />} />
        <Route path="/admin/admission" element={<AdminAdmissionPage />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        <Route path="/admin/gallery/:albumName/:albumId/photos" element={<AdminPhotosPage />} />
        <Route path="/admin/staff" element={<AdminStaffPage />} />
        <Route path="/admin/staff/:staffId" element={<AdminSingleStaff />} />
        <Route path="/admin/contact" element={<AdminContact />} />
        <Route path="/admin/about" element={<AdminAboutUsPage />} />
        <Route path="/admin/academic" element={<AdminAcademicPage />} />
        <Route path="/admin/principal" element={<AdminPrincipalPage />} />
        <Route path="/admin/managesliderphotos" element={<ManageImageSlider />} />
        <Route path="/admin/managesliderphotos/addphoto" element={<AddPhoto />} />
        <Route path="/admin/managefootersliderphotos" element={<ManageFooterImageSlider />} />
        <Route path="/admin/managefootersliderphotos/addphoto" element={<AddFooterPhoto />} />
        <Route path="/admin/manageletsgetinspired" element={<ManageLetsGetInspired />} />
        <Route path="/admin/letsgetinspired/create" element={<AddQuote />} />
        <Route path="/admin/letsgetinspired/update/:letsgetinspiredId" element={<UpdateLetsGetInspired />} />
        <Route path="/admin/notice/update/:noticeId" element={<UpdateNotice />} />
        <Route path="/admin/notice/create" element={<AddNotice />} />
        <Route path="/admin/principal/update/:principalId" element={<UpdatePrincipal />} />
        <Route path="/admin/album/update/:albumId" element={<UpdateAlbum />} />
        <Route path="/admin/album/create" element={<AddAlbum />} />
        <Route path="/admin/photo/create" element={<AddAlbumPhoto />} />
        <Route path="/admin/video/create" element={<AddAlbumVideo />} />
        <Route path="/admin/contact/update/:contactId" element={<UpdateContact />} />
        <Route path="/admin/staff/update/:staffId" element={<UpdateStaff />} />
        <Route path="/admin/staffs/create" element={<AddStaff />} />
        <Route path="/admin/admission/update" element={<UpdateAdmission />} />
        <Route path="/admin/academic/update" element={<UpdateAcademic />} />
        <Route path="/admin/about/update" element={<UpdateAbout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
