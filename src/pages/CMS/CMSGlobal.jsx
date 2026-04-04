import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Tabs,
  Input,
  Card,
  Spin,
  message,
  Upload,
  Switch,
} from "antd";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import {
  useGetCmsNavFooterDataQuery,
  useUpdateCmsNavFooterDataMutation,
} from "../../redux/feature/cms/globalApi";

const defaultNavigation = [
  { label: "Home", isVisible: true },
  { label: "Interior", isVisible: true },
  { label: "Exterior", isVisible: true },
  { label: "Lawn & Garden", isVisible: true },
  { label: "Specialized", isVisible: true },
  { label: "Articles", isVisible: true },
];

const defaultSidebar = [
  { label: "Dashboard", isVisible: true },
  { label: "Profile", isVisible: true },
  { label: "Referral", isVisible: true },
  { label: "VIP Member", isVisible: true },
];

const defaultSocialLinks = [
  { platform: "Facebook", url: "" },
  { platform: "Instagram", url: "" },
  { platform: "Twitter", url: "" },
  { platform: "LinkedIn", url: "" },
];

const CMSGlobal = () => {
  const [activeTab, setActiveTab] = useState("branding");
  const [messageApi, contextHolder] = message.useMessage();

  const { data: globalData, isLoading, refetch } = useGetCmsNavFooterDataQuery();
  const [updateCmsNavFooterData, { isLoading: isUpdating }] =
    useUpdateCmsNavFooterDataMutation();

  const [branding, setBranding] = useState({
    primaryColor: "",
    secondaryColor: "",
    logo: "",
    fileObj: null,
  });

  const [navigation, setNavigation] = useState(defaultNavigation);
  const [sidebar, setSidebar] = useState(defaultSidebar);

  const [footer, setFooter] = useState({
    address: "",
    email: "",
    phone: "",
    copyRightText: "",
    socialLinks: defaultSocialLinks,
  });

  const syncGlobalState = (data) => {
    if (!data) return;

    setBranding({
      primaryColor: data?.branding?.primaryColor || "",
      secondaryColor: data?.branding?.secondaryColor || "",
      logo: data?.branding?.logo || "",
      fileObj: null,
    });

    setNavigation(
      Array.isArray(data?.navigation) && data.navigation.length
        ? data.navigation.map((item) => ({
            label: item?.label || "",
            isVisible: item?.isVisible ?? true,
          }))
        : defaultNavigation
    );

    setSidebar(
      Array.isArray(data?.sidebar) && data.sidebar.length
        ? data.sidebar.map((item) => ({
            label: item?.label || "",
            isVisible: item?.isVisible ?? true,
          }))
        : defaultSidebar
    );

    setFooter({
      address: data?.footer?.address || "",
      email: data?.footer?.email || "",
      phone: data?.footer?.phone || "",
      copyRightText: data?.footer?.copyRightText || "",
      socialLinks:
        Array.isArray(data?.footer?.socialLinks) && data.footer.socialLinks.length
          ? data.footer.socialLinks.map((item) => ({
              platform: item?.platform || "",
              url: item?.url || "",
            }))
          : defaultSocialLinks,
    });
  };

  useEffect(() => {
    if (!globalData) return;
    syncGlobalState(globalData);
  }, [globalData]);

  const handleBrandingChange = (field, value) => {
    setBranding((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNavigationChange = (index, field, value) => {
    setNavigation((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSidebarChange = (index, field, value) => {
    setSidebar((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleFooterChange = (field, value) => {
    setFooter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkChange = (index, value) => {
    setFooter((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((item, i) =>
        i === index ? { ...item, url: value } : item
      ),
    }));
  };

  const buildPayload = () => ({
    branding: {
      primaryColor: branding.primaryColor,
      secondaryColor: branding.secondaryColor,
    },
    navigation: navigation.map((item) => ({
      label: item.label,
      isVisible: item.isVisible,
    })),
    sidebar: sidebar.map((item) => ({
      label: item.label,
      isVisible: item.isVisible,
    })),
    footer: {
      address: footer.address,
      email: footer.email,
      phone: footer.phone,
      copyRightText: footer.copyRightText,
      socialLinks: footer.socialLinks.map((item) => ({
        platform: item.platform,
        url: item.url,
      })),
    },
  });

  const handleSave = async () => {
    try {
      const payload = buildPayload();
      const formData = new FormData();

      formData.append("isLogo", branding.fileObj ? "true" : "false");
      formData.append("data", JSON.stringify(payload));

      if (branding.fileObj) {
        formData.append("image", branding.fileObj);
      }

      const res = await updateCmsNavFooterData(formData).unwrap();

      syncGlobalState(res?.data || res);
      await refetch();

      messageApi.success("Global settings saved successfully!");
    } catch (error) {
      console.error("Update error:", error);
      messageApi.error(error?.data?.message || "Failed to save global settings");
    }
  };

  const logoFileList = useMemo(() => {
    return branding.logo
      ? [
          {
            uid: "branding-logo",
            name: branding.fileObj?.name || "logo.png",
            status: "done",
            url: branding.logo,
          },
        ]
      : [];
  }, [branding.logo, branding.fileObj]);

  const items = [
    {
      key: "branding",
      label: "Branding",
      children: (
        <Card title="Branding Configuration" className="shadow-md">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Primary Color</label>
              <Input
                value={branding.primaryColor}
                onChange={(e) =>
                  handleBrandingChange("primaryColor", e.target.value)
                }
                placeholder="#1D69E1"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Secondary Color</label>
              <Input
                value={branding.secondaryColor}
                onChange={(e) =>
                  handleBrandingChange("secondaryColor", e.target.value)
                }
                placeholder="#ABE7B4"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Logo</label>
              <Upload
                listType="picture"
                maxCount={1}
                fileList={logoFileList}
                beforeUpload={(file) => {
                  handleBrandingChange("fileObj", file);
                  handleBrandingChange("logo", URL.createObjectURL(file));
                  return false;
                }}
                onRemove={() => {
                  handleBrandingChange("logo", "");
                  handleBrandingChange("fileObj", null);
                }}
              >
                {!branding.logo && (
                  <Button icon={<UploadOutlined />}>Upload Logo</Button>
                )}
              </Upload>
            </div>
          </div>
        </Card>
      ),
    },
    {
      key: "navigation",
      label: "Navigation",
      children: (
        <Card title="Navigation Menu" className="shadow-md">
          <div className="space-y-4">
            {navigation.map((item, index) => (
              <div
                key={`nav-${index}`}
                className="border rounded-md p-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <label className="block mb-2 font-medium">Label</label>
                  <Input
                    value={item.label}
                    onChange={(e) =>
                      handleNavigationChange(index, "label", e.target.value)
                    }
                    placeholder="Menu label"
                  />
                </div>

                <div className="min-w-[120px]">
                  <label className="block mb-2 font-medium">Visible</label>
                  <Switch
                    checked={!!item.isVisible}
                    onChange={(checked) =>
                      handleNavigationChange(index, "isVisible", checked)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ),
    },
    {
      key: "sidebar",
      label: "Sidebar",
      children: (
        <Card title="Sidebar Menu" className="shadow-md">
          <div className="space-y-4">
            {sidebar.map((item, index) => (
              <div
                key={`sidebar-${index}`}
                className="border rounded-md p-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <label className="block mb-2 font-medium">Label</label>
                  <Input
                    value={item.label}
                    onChange={(e) =>
                      handleSidebarChange(index, "label", e.target.value)
                    }
                    placeholder="Sidebar label"
                  />
                </div>

                <div className="min-w-[120px]">
                  <label className="block mb-2 font-medium">Visible</label>
                  <Switch
                    checked={!!item.isVisible}
                    onChange={(checked) =>
                      handleSidebarChange(index, "isVisible", checked)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ),
    },
    {
      key: "footer",
      label: "Footer",
      children: (
        <Card title="Footer Configuration" className="shadow-md">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Address</label>
              <Input
                value={footer.address}
                onChange={(e) => handleFooterChange("address", e.target.value)}
                placeholder="6600 Headquarters Oaks Blvd Ste. 150, Plano, TX. 75023"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <Input
                value={footer.email}
                onChange={(e) => handleFooterChange("email", e.target.value)}
                placeholder="support@yourtradesource.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone</label>
              <Input
                value={footer.phone}
                onChange={(e) => handleFooterChange("phone", e.target.value)}
                placeholder="+1 234 567 890"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Copyright Text</label>
              <Input
                value={footer.copyRightText}
                onChange={(e) =>
                  handleFooterChange("copyRightText", e.target.value)
                }
                placeholder="© 2025 Sparktech. All rights reserved."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {footer.socialLinks.map((item, index) => (
                <div key={`social-${index}`}>
                  <label className="block mb-2 font-medium">
                    {item.platform} URL
                  </label>
                  <Input
                    value={item.url}
                    onChange={(e) =>
                      handleSocialLinkChange(index, e.target.value)
                    }
                    placeholder={`https://${item.platform.toLowerCase()}.com/...`}
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}

      <div className="flex justify-between font-title bg-[#2C3E50] px-3 py-2 rounded-md mb-6">
        <p className="text-[#ffffff] font-title text-3xl font-bold">
          CMS - Global Settings
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

export default CMSGlobal;