import { useEffect, useState } from "react";
import {
  Button,
  Tabs,
  Input,
  Switch,
  Card,
  Spin,
  message,
  Upload,
} from "antd";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import {
  useGetCmsHomeDataQuery,
  useUpdateCmsHomeDataMutation,
} from "../../redux/feature/cms/homeApi";

const CMSHome = () => {
  const [activeTab, setActiveTab] = useState("landingPage");
  const [messageApi, contextHolder] = message.useMessage();

  const { data: cmsData, isLoading, refetch } = useGetCmsHomeDataQuery();
  const [updateCmsHomeData, { isLoading: isUpdating }] =
    useUpdateCmsHomeDataMutation();

  const [landingPage, setLandingPage] = useState({
    banner: {
      title: "",
      content: "",
      image: "",
      fileObj: null,
      isVisible: true,
    },
    projectsNear: {
      title: "",
      isVisible: true,
    },
    contractorNear: {
      title: "",
      isVisible: true,
    },
    recentArticle: {
      title: "",
      isVisible: true,
    },
  });

  const [loggedInPage, setLoggedInPage] = useState({
    welcomeBanner: {
      title: "",
      content: "",
      image: "",
      fileObj: null,
      isVisible: true,
    },
    expertContractor: {
      title: "",
      isVisible: true,
    },
    membershipBanner: {
      title: "",
      content: "",
      image: "",
      fileObj: null,
      isVisible: true,
    },
    recentArticle: {
      title: "",
      isVisible: true,
    },
  });

  useEffect(() => {
    if (!cmsData) return;

    setLandingPage({
      banner: {
        title: cmsData?.landingPage?.banner?.title || "",
        content: cmsData?.landingPage?.banner?.content || "",
        image: cmsData?.landingPage?.banner?.image || "",
        fileObj: null,
        isVisible: cmsData?.landingPage?.banner?.isVisible ?? true,
      },
      projectsNear: {
        title: cmsData?.landingPage?.projectsNear?.title || "",
        isVisible: cmsData?.landingPage?.projectsNear?.isVisible ?? true,
      },
      contractorNear: {
        title: cmsData?.landingPage?.contractorNear?.title || "",
        isVisible: cmsData?.landingPage?.contractorNear?.isVisible ?? true,
      },
      recentArticle: {
        title: cmsData?.landingPage?.recentArticle?.title || "",
        isVisible: cmsData?.landingPage?.recentArticle?.isVisible ?? true,
      },
    });

    setLoggedInPage({
      welcomeBanner: {
        title: cmsData?.loggedInPage?.welcomeBanner?.title || "",
        content: cmsData?.loggedInPage?.welcomeBanner?.content || "",
        image: cmsData?.loggedInPage?.welcomeBanner?.image || "",
        fileObj: null,
        isVisible: cmsData?.loggedInPage?.welcomeBanner?.isVisible ?? true,
      },
      expertContractor: {
        title: cmsData?.loggedInPage?.expertContractor?.title || "",
        isVisible: cmsData?.loggedInPage?.expertContractor?.isVisible ?? true,
      },
      membershipBanner: {
        title: cmsData?.loggedInPage?.membershipBanner?.title || "",
        content: cmsData?.loggedInPage?.membershipBanner?.content || "",
        image: cmsData?.loggedInPage?.membershipBanner?.image || "",
        fileObj: null,
        isVisible: cmsData?.loggedInPage?.membershipBanner?.isVisible ?? true,
      },
      recentArticle: {
        title: cmsData?.loggedInPage?.recentArticle?.title || "",
        isVisible: cmsData?.loggedInPage?.recentArticle?.isVisible ?? true,
      },
    });
  }, [cmsData]);

  const handleLandingPageChange = (section, field, value) => {
    setLandingPage((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleLoggedInPageChange = (section, field, value) => {
    setLoggedInPage((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const buildCmsPayload = () => ({
    landingPage: {
      banner: {
        title: landingPage.banner.title,
        content: landingPage.banner.content,
        isVisible: landingPage.banner.isVisible,
      },
      projectsNear: {
        title: landingPage.projectsNear.title,
        isVisible: landingPage.projectsNear.isVisible,
      },
      contractorNear: {
        title: landingPage.contractorNear.title,
        isVisible: landingPage.contractorNear.isVisible,
      },
      recentArticle: {
        title: landingPage.recentArticle.title,
        isVisible: landingPage.recentArticle.isVisible,
      },
    },
    loggedInPage: {
      welcomeBanner: {
        title: loggedInPage.welcomeBanner.title,
        content: loggedInPage.welcomeBanner.content,
        isVisible: loggedInPage.welcomeBanner.isVisible,
      },
      expertContractor: {
        title: loggedInPage.expertContractor.title,
        isVisible: loggedInPage.expertContractor.isVisible,
      },
      membershipBanner: {
        title: loggedInPage.membershipBanner.title,
        content: loggedInPage.membershipBanner.content,
        isVisible: loggedInPage.membershipBanner.isVisible,
      },
      recentArticle: {
        title: loggedInPage.recentArticle.title,
        isVisible: loggedInPage.recentArticle.isVisible,
      },
    },
  });

  const handleSave = async () => {
    try {
      const cmsPayload = buildCmsPayload();

      const imageUploads = [
        {
          sectionPath: "landingPage.banner",
          file: landingPage.banner.fileObj,
        },
        {
          sectionPath: "loggedInPage.welcomeBanner",
          file: loggedInPage.welcomeBanner.fileObj,
        },
        {
          sectionPath: "loggedInPage.membershipBanner",
          file: loggedInPage.membershipBanner.fileObj,
        },
      ];

      const filesToUpload = imageUploads.filter((item) => item.file);

      // Always send base data as FormData first
      const baseFormData = new FormData();
      baseFormData.append("data", JSON.stringify(cmsPayload));

      await updateCmsHomeData(baseFormData).unwrap();

      // Then upload images section-wise if any selected
      for (const item of filesToUpload) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(cmsPayload));
        formData.append("sectionPath", item.sectionPath);
        formData.append("image", item.file);

        await updateCmsHomeData(formData).unwrap();
      }

      messageApi.success("CMS Home data saved successfully!");
      refetch();
    } catch (error) {
      messageApi.error(error?.data?.message || "Failed to save CMS Home data");
    }
  };

  const bannerFileList = landingPage.banner.image
    ? [
        {
          uid: "landing-banner",
          name: landingPage.banner.fileObj?.name || "banner.jpg",
          status: "done",
          url: landingPage.banner.image,
        },
      ]
    : [];

  const welcomeBannerFileList = loggedInPage.welcomeBanner.image
    ? [
        {
          uid: "welcome-banner",
          name: loggedInPage.welcomeBanner.fileObj?.name || "welcome-banner.jpg",
          status: "done",
          url: loggedInPage.welcomeBanner.image,
        },
      ]
    : [];

  const membershipBannerFileList = loggedInPage.membershipBanner.image
    ? [
        {
          uid: "membership-banner",
          name:
            loggedInPage.membershipBanner.fileObj?.name ||
            "membership-banner.jpg",
          status: "done",
          url: loggedInPage.membershipBanner.image,
        },
      ]
    : [];

  const items = [
    {
      key: "landingPage",
      label: "Landing Page",
      children: (
        <div className="space-y-6">
          <Card title="Banner Section" className="shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <Input
                  value={landingPage.banner.title}
                  onChange={(e) =>
                    handleLandingPageChange("banner", "title", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Content</label>
                <Input.TextArea
                  value={landingPage.banner.content}
                  onChange={(e) =>
                    handleLandingPageChange("banner", "content", e.target.value)
                  }
                  rows={3}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Image</label>
                <Upload
                  listType="picture"
                  maxCount={1}
                  fileList={bannerFileList}
                  beforeUpload={(file) => {
                    handleLandingPageChange("banner", "fileObj", file);
                    handleLandingPageChange(
                      "banner",
                      "image",
                      URL.createObjectURL(file)
                    );
                    return false;
                  }}
                  onRemove={() => {
                    handleLandingPageChange("banner", "image", "");
                    handleLandingPageChange("banner", "fileObj", null);
                  }}
                >
                  {!landingPage.banner.image && (
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  )}
                </Upload>
              </div>

              <div className="flex items-center gap-3">
                <label className="font-medium">Visible</label>
                <Switch
                  checked={!!landingPage.banner.isVisible}
                  onChange={(checked) =>
                    handleLandingPageChange("banner", "isVisible", checked)
                  }
                />
              </div>
            </div>
          </Card>

          <Card title="Projects Near You" className="shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <Input
                  value={landingPage.projectsNear.title}
                  onChange={(e) =>
                    handleLandingPageChange(
                      "projectsNear",
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="font-medium">Visible</label>
                <Switch
                  checked={!!landingPage.projectsNear.isVisible}
                  onChange={(checked) =>
                    handleLandingPageChange("projectsNear", "isVisible", checked)
                  }
                />
              </div>
            </div>
          </Card>

          <Card title="Contractor Near You" className="shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <Input
                  value={landingPage.contractorNear.title}
                  onChange={(e) =>
                    handleLandingPageChange(
                      "contractorNear",
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="font-medium">Visible</label>
                <Switch
                  checked={!!landingPage.contractorNear.isVisible}
                  onChange={(checked) =>
                    handleLandingPageChange(
                      "contractorNear",
                      "isVisible",
                      checked
                    )
                  }
                />
              </div>
            </div>
          </Card>

          <Card title="Recent Article" className="shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <Input
                  value={landingPage.recentArticle.title}
                  onChange={(e) =>
                    handleLandingPageChange(
                      "recentArticle",
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="font-medium">Visible</label>
                <Switch
                  checked={!!landingPage.recentArticle.isVisible}
                  onChange={(checked) =>
                    handleLandingPageChange("recentArticle", "isVisible", checked)
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: "loggedInPage",
      label: "Logged In Page",
      children: (
        <div className="space-y-6">
          <Card title="Welcome Banner" className="shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <Input
                  value={loggedInPage.welcomeBanner.title}
                  onChange={(e) =>
                    handleLoggedInPageChange(
                      "welcomeBanner",
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Content</label>
                <Input.TextArea
                  value={loggedInPage.welcomeBanner.content}
                  onChange={(e) =>
                    handleLoggedInPageChange(
                      "welcomeBanner",
                      "content",
                      e.target.value
                    )
                  }
                  rows={3}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Image</label>
                <Upload
                  listType="picture"
                  maxCount={1}
                  fileList={welcomeBannerFileList}
                  beforeUpload={(file) => {
                    handleLoggedInPageChange("welcomeBanner", "fileObj", file);
                    handleLoggedInPageChange(
                      "welcomeBanner",
                      "image",
                      URL.createObjectURL(file)
                    );
                    return false;
                  }}
                  onRemove={() => {
                    handleLoggedInPageChange("welcomeBanner", "image", "");
                    handleLoggedInPageChange("welcomeBanner", "fileObj", null);
                  }}
                >
                  {!loggedInPage.welcomeBanner.image && (
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  )}
                </Upload>
              </div>

              <div className="flex items-center gap-3">
                <label className="font-medium">Visible</label>
                <Switch
                  checked={!!loggedInPage.welcomeBanner.isVisible}
                  onChange={(checked) =>
                    handleLoggedInPageChange(
                      "welcomeBanner",
                      "isVisible",
                      checked
                    )
                  }
                />
              </div>
            </div>
          </Card>

          <Card title="Expert Contractor" className="shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <Input
                  value={loggedInPage.expertContractor.title}
                  onChange={(e) =>
                    handleLoggedInPageChange(
                      "expertContractor",
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="font-medium">Visible</label>
                <Switch
                  checked={!!loggedInPage.expertContractor.isVisible}
                  onChange={(checked) =>
                    handleLoggedInPageChange(
                      "expertContractor",
                      "isVisible",
                      checked
                    )
                  }
                />
              </div>
            </div>
          </Card>

          <Card title="Membership Banner" className="shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <Input
                  value={loggedInPage.membershipBanner.title}
                  onChange={(e) =>
                    handleLoggedInPageChange(
                      "membershipBanner",
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Content</label>
                <Input.TextArea
                  value={loggedInPage.membershipBanner.content}
                  onChange={(e) =>
                    handleLoggedInPageChange(
                      "membershipBanner",
                      "content",
                      e.target.value
                    )
                  }
                  rows={3}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Image</label>
                <Upload
                  listType="picture"
                  maxCount={1}
                  fileList={membershipBannerFileList}
                  beforeUpload={(file) => {
                    handleLoggedInPageChange(
                      "membershipBanner",
                      "fileObj",
                      file
                    );
                    handleLoggedInPageChange(
                      "membershipBanner",
                      "image",
                      URL.createObjectURL(file)
                    );
                    return false;
                  }}
                  onRemove={() => {
                    handleLoggedInPageChange("membershipBanner", "image", "");
                    handleLoggedInPageChange(
                      "membershipBanner",
                      "fileObj",
                      null
                    );
                  }}
                >
                  {!loggedInPage.membershipBanner.image && (
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  )}
                </Upload>
              </div>

              <div className="flex items-center gap-3">
                <label className="font-medium">Visible</label>
                <Switch
                  checked={!!loggedInPage.membershipBanner.isVisible}
                  onChange={(checked) =>
                    handleLoggedInPageChange(
                      "membershipBanner",
                      "isVisible",
                      checked
                    )
                  }
                />
              </div>
            </div>
          </Card>

          <Card title="Recent Article" className="shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <Input
                  value={loggedInPage.recentArticle.title}
                  onChange={(e) =>
                    handleLoggedInPageChange(
                      "recentArticle",
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="font-medium">Visible</label>
                <Switch
                  checked={!!loggedInPage.recentArticle.isVisible}
                  onChange={(checked) =>
                    handleLoggedInPageChange(
                      "recentArticle",
                      "isVisible",
                      checked
                    )
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}

      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md mb-6">
        <p className="text-[#ffffff] font-title text-3xl font-bold">
          CMS - Home
        </p>

        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={isUpdating}
          className="bg-green-600"
        >
          Save Changes
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          className="cms-tabs"
        />
      )}
    </div>
  );
};

export default CMSHome;