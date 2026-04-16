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
import { SaveOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetReferralQuery, useUpdateReferralMutation } from "../../redux/feature/cms/cmsApi";

const CMSReferral = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [messageApi, contextHolder] = message.useMessage();

  // Redux hooks
  const { data: referralDataFromApi, isLoading: isFetching } = useGetReferralQuery();
  const [updateReferral, { isLoading: isUpdating }] = useUpdateReferralMutation();

  const [referralData, setReferralData] = useState({
    hero: {
      title: "Help Your Friends & Get $10",
      content: "At YourTradeSource (YTS), we believe great work is worth sharing. Refer a friend, and you both earn rewards!",
      isVisible: true,
    },
    howItWorks: {
      title: "Here's how it works:",
      content: "Your friend gets $10 off their first completed service.\nYou get a $10 credit toward your next service once they complete their first task.\nSimply enter a referral code to claim your reward.",
      isVisible: true,
    },
  });

  const [heroImage, setHeroImage] = useState(null);
  const [heroImageUrl, setHeroImageUrl] = useState("");

  // Load data from API when available
  useEffect(() => {
    if (referralDataFromApi?.sections) {
      setReferralData(referralDataFromApi.sections);
    }
    if (referralDataFromApi?.sections?.hero?.image) {
      setHeroImageUrl(referralDataFromApi.sections.hero.image);
    }
  }, [referralDataFromApi]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("sectionPath", "hero");
      formData.append("data", JSON.stringify({ sections: referralData }));
      if (heroImage) {
        formData.append("image", heroImage);
      }

      await updateReferral(formData).unwrap();
      messageApi.success("Referral settings updated successfully!");
      setHeroImage(null);
    } catch (error) {
      messageApi.error(error?.data?.message || "Failed to update referral settings");
    }
  };

  const handleHeroImageUpload = (info) => {
    if (info.file.status === "done") {
      setHeroImage(info.file.originFileObj);
      setHeroImageUrl(URL.createObjectURL(info.file.originFileObj));
      messageApi.success("Image selected successfully!");
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-800">Referral Program Management</h1>
        <p className="text-gray-600">Manage referral program content and visibility</p>
      </div>

      <Card className="shadow-lg border-none">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "hero",
              label: "Hero Section",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">Hero Visibility</label>
                    <Switch
                      checked={referralData.hero.isVisible}
                      onChange={(checked) => 
                        setReferralData(prev => ({ 
                          ...prev, 
                          hero: { ...prev.hero, isVisible: checked } 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Title
                    </label>
                    <Input
                      value={referralData.hero.title}
                      onChange={(e) => 
                        setReferralData(prev => ({ 
                          ...prev, 
                          hero: { ...prev.hero, title: e.target.value } 
                        }))
                      }
                      placeholder="Enter hero title"
                      className="max-w-2xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Content
                    </label>
                    <Input.TextArea
                      value={referralData.hero.content}
                      onChange={(e) => 
                        setReferralData(prev => ({ 
                          ...prev, 
                          hero: { ...prev.hero, content: e.target.value } 
                        }))
                      }
                      rows={4}
                      placeholder="Enter hero content"
                      className="max-w-2xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Image
                    </label>
                    {!heroImageUrl ? (
                      <Upload
                        accept="image/*"
                        showUploadList={false}
                        customRequest={({ onSuccess }) => {
                          setTimeout(() => {
                            onSuccess("ok");
                          }, 500);
                        }}
                        onChange={handleHeroImageUpload}
                      >
                        <Button icon={<UploadOutlined />}>Select Image</Button>
                      </Upload>
                    ) : (
                      <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                        <div className="flex items-center gap-3">
                          <img
                            src={heroImageUrl}
                            alt="Hero"
                            className="h-10 w-10 object-contain rounded cursor-pointer hover:opacity-80"
                            onClick={() => window.open(heroImageUrl, "_blank")}
                          />
                          <span className="text-sm text-gray-700 truncate max-w-[200px]">
                            {heroImage?.name || "image.png"}
                          </span>
                        </div>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            setHeroImage(null);
                            setHeroImageUrl("");
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ),
            },
            {
              key: "howItWorks",
              label: "How It Works Section",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">How It Works Visibility</label>
                    <Switch
                      checked={referralData.howItWorks.isVisible}
                      onChange={(checked) => 
                        setReferralData(prev => ({ 
                          ...prev, 
                          howItWorks: { ...prev.howItWorks, isVisible: checked } 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Title
                    </label>
                    <Input
                      value={referralData.howItWorks.title}
                      onChange={(e) => 
                        setReferralData(prev => ({ 
                          ...prev, 
                          howItWorks: { ...prev.howItWorks, title: e.target.value } 
                        }))
                      }
                      placeholder="Enter section title"
                      className="max-w-2xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Content
                    </label>
                    <Input.TextArea
                      value={referralData.howItWorks.content}
                      onChange={(e) => 
                        setReferralData(prev => ({ 
                          ...prev, 
                          howItWorks: { ...prev.howItWorks, content: e.target.value } 
                        }))
                      }
                      rows={6}
                      placeholder="Enter section content"
                      className="max-w-2xl"
                    />
                  </div>
                </div>
              ),
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

export default CMSReferral;