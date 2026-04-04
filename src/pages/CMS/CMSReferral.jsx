import { useState } from "react";
import {
  Button,
  Tabs,
  Input,
  Switch,
  Card,
  Spin,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";

const CMSReferral = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [messageApi, contextHolder] = message.useMessage();

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

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Saving Referral Data:", referralData);
      messageApi.success("Referral settings saved successfully!");
    } catch {
      messageApi.error("Failed to save referral settings");
    } finally {
      setIsLoading(false);
    }
  };

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
            loading={isLoading}
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