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
import { SaveOutlined, UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetMembershipQuery, useUpdateMembershipMutation } from "../../redux/feature/cms/cmsApi";

const CMSMembership = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [messageApi, contextHolder] = message.useMessage();

  // Redux hooks
  const { data: membershipDataFromApi, isLoading: isFetching } = useGetMembershipQuery();
  const [updateMembership, { isLoading: isUpdating }] = useUpdateMembershipMutation();

  const [mainImage, setMainImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [sections, setSections] = useState({
    hero: {
      title: "Choose Your Membership. Power Up Your Projects.",
      content: "Whether you're hiring a trusted tradesperson or getting hands-on with your own DIY repairs, YTS gives you the tools, knowledge, and professionals you need – all in one place.",
      isVisible: true,
    },
    upgradeText: {
      title: "✨ Start Free, or upgrade for more:",
      isVisible: true,
    },
    cardFree: {
      title: "20% Off Pre-Priced Projects",
      features: [
        "Access to contractor listings",
        "Post job requests",
        "Basic DIY tips"
      ],
      isVisible: true,
    },
    cardPremium: {
      title: "Premium",
      content: "$9.99/month or $99/year",
      features: [
        "Priority contractor matching",
        "Advanced tutorials & webinars",
        "Discounts on tools & products",
        "Dedicated support"
      ],
      isVisible: true,
    },
    cardVip: {
      title: "VIP",
      content: "$24.99/month or $249/year",
      features: [
        "All Premium benefits",
        "Access to VIP-only contractors",
        "Free annual home consultation",
        "Early access + VIP event invites"
      ],
      isVisible: true,
    }
  });

  // Load data from API when available
  useEffect(() => {
    if (membershipDataFromApi?.sections) {
      setSections(membershipDataFromApi.sections);
    }
    if (membershipDataFromApi?.image) {
      setImageUrl(membershipDataFromApi.image);
    }
  }, [membershipDataFromApi]);

  const handleSave = async () => {
    try {
      // Auto logic: if image exists (either selected or already from API), isLogo is true
      const isLogo = !!mainImage || !!imageUrl;

      const formData = new FormData();
      formData.append("isLogo", isLogo.toString());
      if (mainImage) {
        formData.append("image", mainImage);
      }
      formData.append("data", JSON.stringify({ sections }));

      await updateMembership(formData).unwrap();
      messageApi.success("Membership settings updated successfully!");
    } catch (error) {
      messageApi.error(error?.data?.message || "Failed to update membership settings");
    }
  };

  const handleMainImageUpload = (info) => {
    if (info.file.status === "done") {
      setMainImage(info.file.originFileObj);
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
      messageApi.success("Image selected successfully!");
    }
  };

  const handleFeatureChange = (section, index, value) => {
    const updatedFeatures = [...sections[section].features];
    updatedFeatures[index] = value;
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], features: updatedFeatures }
    }));
  };

  const addFeature = (section) => {
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], features: [...prev[section].features, ""] }
    }));
  };

  const removeFeature = (section, index) => {
    const updatedFeatures = sections[section].features.filter((_, i) => i !== index);
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], features: updatedFeatures }
    }));
  };

  const renderSectionInputs = (sectionKey, label, hasContent = true, hasFeatures = false) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold">{label} Visibility</label>
        <Switch
          checked={sections[sectionKey].isVisible}
          onChange={(checked) => 
            setSections(prev => ({ 
              ...prev, 
              [sectionKey]: { ...prev[sectionKey], isVisible: checked } 
            }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <Input
          value={sections[sectionKey].title}
          onChange={(e) => 
            setSections(prev => ({ 
              ...prev, 
              [sectionKey]: { ...prev[sectionKey], title: e.target.value } 
            }))
          }
          className="max-w-2xl"
        />
      </div>

      {hasContent && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <Input.TextArea
            value={sections[sectionKey].content}
            onChange={(e) => 
              setSections(prev => ({ 
                ...prev, 
                [sectionKey]: { ...prev[sectionKey], content: e.target.value } 
              }))
            }
            rows={3}
            className="max-w-2xl"
          />
        </div>
      )}

      {hasFeatures && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
          <div className="space-y-2 max-w-2xl">
            {sections[sectionKey].features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(sectionKey, index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                />
                <Button 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => removeFeature(sectionKey, index)}
                />
              </div>
            ))}
            <Button 
              type="dashed" 
              icon={<PlusOutlined />} 
              onClick={() => addFeature(sectionKey)}
              className="w-full"
            >
              Add Feature
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  if (isFetching) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {contextHolder}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Membership Management</h1>
        <p className="text-gray-600">Manage membership sections, plans, and features</p>
      </div>

      {/* Image Upload Card (Logic handles isLogo automatically) */}
      <Card className="mb-6 shadow-md border-none">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Main Page Image / Logo</label>
          <div className="flex items-center gap-4">
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={({ onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 500);
              }}
              onChange={handleMainImageUpload}
            >
              <Button icon={<UploadOutlined />}>Select Image File</Button>
            </Upload>
            {imageUrl && (
              <Button 
                danger 
                onClick={() => {
                  setMainImage(null);
                  setImageUrl("");
                }}
              >
                Remove
              </Button>
            )}
          </div>
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Main Preview" className="h-20 w-auto rounded border" />
              <p className="text-xs text-gray-500 mt-1">* isLogo will be set to true on save</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="shadow-lg border-none">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "hero",
              label: "Hero Section",
              children: renderSectionInputs("hero", "Hero"),
            },
            {
              key: "upgrade",
              label: "Upgrade Text",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">Upgrade Text Visibility</label>
                    <Switch
                      checked={sections.upgradeText.isVisible}
                      onChange={(checked) => 
                        setSections(prev => ({ 
                          ...prev, 
                          upgradeText: { ...prev.upgradeText, isVisible: checked } 
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <Input
                      value={sections.upgradeText.title}
                      onChange={(e) => 
                        setSections(prev => ({ 
                          ...prev, 
                          upgradeText: { ...prev.upgradeText, title: e.target.value } 
                        }))
                      }
                      className="max-w-2xl"
                    />
                  </div>
                </div>
              ),
            },
            {
              key: "cardFree",
              label: "Free Card",
              children: renderSectionInputs("cardFree", "Free Plan", false, true),
            },
            {
              key: "cardPremium",
              label: "Premium Card",
              children: renderSectionInputs("cardPremium", "Premium Plan", true, true),
            },
            {
              key: "cardVip",
              label: "VIP Card",
              children: renderSectionInputs("cardVip", "VIP Plan", true, true),
            },
          ]}
        />

        <div className="mt-8 flex justify-end">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={isUpdating}
            onClick={handleSave}
            className="bg-[#1D69E1] hover:bg-[#164FA9] h-10 px-8 rounded-lg"
          >
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CMSMembership;