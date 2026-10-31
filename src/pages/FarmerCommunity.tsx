import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { INITIAL_COMMUNITY_POSTS } from '../services/storage';
import { CommunityPost, Language, CollectiveHarvestIntention } from '../types';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Globe2,
  Plus,
  Sparkles,
  CheckCircle2,
  Send,
  X,
  Layers,
  ShoppingBag,
  AlertTriangle,
  Stethoscope
} from 'lucide-react';

export const FarmerCommunity: React.FC = () => {
  const { t, language } = useTranslation();
  const [activeCommunityTab, setActiveCommunityTab] = useState<'feed' | 'collective' | 'groups' | 'ask_expert'>('feed');
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [translatedMap, setTranslatedMap] = useState<Record<string, boolean>>({});
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  // New post state
  const [newContent, setNewContent] = useState('');
  const [newCropTag, setNewCropTag] = useState('Tomato');
  const [newDistrict, setNewDistrict] = useState('Mandya');

  // Reply state
  const [replyPostId, setReplyPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Collective Intelligence Intentions
  const [collectivePools, setCollectivePools] = useState<CollectiveHarvestIntention[]>([
    {
      id: 'pool-1',
      village: 'Keragodu / Shivalli',
      district: 'Mandya',
      commodity: 'Tomato (Hybrid Shivam)',
      totalExpectedQtl: 420,
      participatingFarmersCount: 14,
      expectedHarvestWeek: 'Nov 02 - Nov 07',
      oversupplyRisk: 'Moderate',
      targetMandis: ['Bengaluru Yeshwantpur', 'Mysuru Bandipalya'],
      collectiveFpoBuyer: 'Mandya Agri Producers FPO'
    },
    {
      id: 'pool-2',
      village: 'Vemagal & Malur Belt',
      district: 'Kolar',
      commodity: 'Tomato (Shivam & US-440)',
      totalExpectedQtl: 1100,
      participatingFarmersCount: 38,
      expectedHarvestWeek: 'Nov 03 - Nov 08',
      oversupplyRisk: 'Critical Glut Risk',
      targetMandis: ['Kolar APMC Yard', 'Chennai Wholesale Koyambedu'],
      collectiveFpoBuyer: 'Direct BigBasket Wholesale'
    }
  ]);

  const [joinedPoolId, setJoinedPoolId] = useState<string | null>(null);

  // District Groups
  const communityGroups = [
    {
      id: 'grp-1',
      name: 'Mandya Cauvery Basin Farmers Guild',
      district: 'Mandya',
      membersCount: 1420,
      topics: 'Paddy, Ragi, Sugarcane & Drip Tomato',
      leadAgronomist: 'Dr. Ramesh K. (KVK)'
    },
    {
      id: 'grp-2',
      name: 'Kolar & Chikkaballapur Tomato Consortium',
      district: 'Kolar',
      membersCount: 2890,
      topics: 'Export Quality Shivam, Trellising & APMC Auctions',
      leadAgronomist: 'Dr. Srinivasan (IIHR)'
    },
    {
      id: 'grp-3',
      name: 'North Karnataka Chilli & Onion Alliance',
      district: 'Dharwad & Belagavi',
      membersCount: 1950,
      topics: 'Byadgi Dabbi, Bellary Onion Curing & Storage',
      leadAgronomist: 'Prof. Patil (UAS Dharwad)'
    }
  ];

  // Ask Expert Question
  const [expertQuestion, setExpertQuestion] = useState('');
  const [expertCrop, setExpertCrop] = useState('Tomato');
  const [expertSent, setExpertSent] = useState(false);

  const toggleTranslate = (postId: string) => {
    setTranslatedMap(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newP: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: 'Naveen Kumar',
      authorRole: 'Progressive Farmer · Mandya',
      district: newDistrict,
      originalLanguage: language,
      content: {
        en: newContent,
        kn: newContent,
        hi: newContent
      },
      cropTag: newCropTag,
      likes: 1,
      repliesCount: 0,
      timestamp: 'Just now',
      isExpertAnswered: false,
      replies: []
    };

    setPosts([newP, ...posts]);
    setNewContent('');
    setIsNewPostOpen(false);
  };

  const handleAddReply = (postId: string) => {
    if (!replyText.trim()) return;
    setPosts(
      posts.map(p => {
        if (p.id === postId) {
          const newReplies = p.replies || [];
          return {
            ...p,
            repliesCount: p.repliesCount + 1,
            replies: [
              ...newReplies,
              {
                id: `rep-${Date.now()}`,
                authorName: 'Naveen Kumar',
                isExpert: false,
                text: replyText,
                timestamp: 'Just now'
              }
            ]
          };
        }
        return p;
      })
    );
    setReplyText('');
    setReplyPostId(null);
  };

  const handleJoinCollectivePool = (poolId: string) => {
    setCollectivePools(
      collectivePools.map(cp =>
        cp.id === poolId
          ? {
              ...cp,
              totalExpectedQtl: cp.totalExpectedQtl + 40,
              participatingFarmersCount: cp.participatingFarmersCount + 1
            }
          : cp
      )
    );
    setJoinedPoolId(poolId);
  };

  const handleSendExpertQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setExpertSent(true);
    setTimeout(() => {
      setExpertSent(false);
      setExpertQuestion('');
    }, 2500);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Kisan Social Network, Collective Intelligence & Group Selling</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.nav.community}</h1>
          <p className="text-sm text-slate-500">
            Share mandi auction updates, collaborate on collective truck selling to bypass local gluts, and consult KVK scientists.
          </p>
        </div>

        <button
          onClick={() => setIsNewPostOpen(true)}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition-colors text-xs self-start md:self-auto shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post Update or Query</span>
        </button>
      </div>

      {/* Community Sub-Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveCommunityTab('feed')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 ${
            activeCommunityTab === 'feed'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kisan Feed & Discussion
        </button>
        <button
          onClick={() => setActiveCommunityTab('collective')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
            activeCommunityTab === 'collective'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
          <span>Collective Intelligence & Group Selling</span>
        </button>
        <button
          onClick={() => setActiveCommunityTab('groups')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 ${
            activeCommunityTab === 'groups'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          District Community Groups
        </button>
        <button
          onClick={() => setActiveCommunityTab('ask_expert')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
            activeCommunityTab === 'ask_expert'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
          <span>Ask KVK Scientist</span>
        </button>
      </div>

      {/* TAB 1: Main Discussion Feed */}
      {activeCommunityTab === 'feed' && (
        <div className="space-y-4 max-w-3xl">
          {posts.map(post => {
            const isTranslated = !!translatedMap[post.id];
            const postText = isTranslated
              ? post.content[language] || post.content.en
              : post.content[post.originalLanguage] || post.content.en;

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
              >
                {/* Author Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{post.authorName}</span>
                      <span className="text-[11px] text-slate-400">· {post.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500">{post.authorRole}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {post.cropTag}
                    </span>
                    {post.isExpertAnswered && (
                      <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        KVK Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                  {postText}
                </div>

                {/* Translation Toggle Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => toggleTranslate(post.id)}
                    className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                  >
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>
                      {isTranslated
                        ? 'Show Original'
                        : `Translate to ${language === 'kn' ? 'ಕನ್ನಡ' : language === 'hi' ? 'हिंदी' : 'English'}`}
                    </span>
                  </button>

                  <div className="flex items-center gap-4 text-slate-500">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setReplyPostId(replyPostId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.repliesCount} Replies</span>
                    </button>
                  </div>
                </div>

                {/* Existing replies */}
                {post.replies && post.replies.length > 0 && (
                  <div className="mt-3 space-y-2 pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded-xl">
                    {post.replies.map(rep => (
                      <div key={rep.id} className="text-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <span>{rep.authorName}</span>
                          {rep.isExpert && (
                            <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-semibold">
                              Expert
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-normal">· {rep.timestamp}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{rep.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input Box */}
                {replyPostId === post.id && (
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Write a helpful response..."
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    <button
                      onClick={() => handleAddReply(post.id)}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
                    >
                      Reply
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Farmer Collective Intelligence & Group Selling */}
      {activeCommunityTab === 'collective' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <h3 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              What is Farmer Collective Intelligence?
            </h3>
            <p className="leading-relaxed">
              When hundreds of farmers harvest independently on the exact same date, local APMC auction yards suffer artificial gluts that crash prices by 30-40%. 
              MANDI AI aggregates anonymized harvest intentions at the village/hobli level, detects impending supply surges, and organizes collective selling pools to direct wholesale FPO buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {collectivePools.map(pool => (
              <div
                key={pool.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {pool.village}, {pool.district}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-1">{pool.commodity}</h3>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded border uppercase ${
                        pool.oversupplyRisk === 'Critical Glut Risk'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {pool.oversupplyRisk}
                    </span>
                  </div>

                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Upcoming Harvest Window:</span>
                      <span className="font-bold text-slate-800">{pool.expectedHarvestWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pledged Collective Load:</span>
                      <span className="font-bold text-emerald-800 font-mono">{pool.totalExpectedQtl} Quintals</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Farmers in Pool:</span>
                      <span className="font-bold text-slate-800">{pool.participatingFarmersCount} Farmers</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200">
                      <span className="text-slate-500">Direct FPO Buyer:</span>
                      <span className="font-bold text-blue-800">{pool.collectiveFpoBuyer}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {joinedPoolId === pool.id ? (
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>You have pledged 40 Qtl to this collective pool!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleJoinCollectivePool(pool.id)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                    >
                      Pledge My 40 Qtl & Join Collective Selling Pool
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: District Community Groups */}
      {activeCommunityTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {communityGroups.map(grp => (
            <div
              key={grp.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {grp.district} Hub
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-2">{grp.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Focus: {grp.topics}
                </p>

                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Active Farmers:</span>
                    <span className="font-bold text-slate-900">{grp.membersCount}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Lead Scientist:</span>
                    <span className="font-medium text-emerald-800">{grp.leadAgronomist}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Joined ${grp.name}! You will receive notifications for local mandi updates.`)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Join District Group
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Ask KVK Expert */}
      {activeCommunityTab === 'ask_expert' && (
        <div className="max-w-2xl bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              Direct KVK Agronomist Consultation
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-2">Submit Question to Krishi Vigyan Kendra Scientists</h2>
            <p className="text-xs text-slate-500">
              Your inquiry will be routed to the Mandya / Mysore district KVK plant pathology and soil testing lab.
            </p>
          </div>

          {expertSent ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-slate-900 text-base">Question Submitted to KVK Scientist!</h3>
              <p className="text-xs text-slate-500">
                Case Ticket #KVK-918 generated. You will receive an SMS and in-app prescription note within 4 working hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendExpertQuestion} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Crop</label>
                <select
                  value={expertCrop}
                  onChange={e => setExpertCrop(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium"
                >
                  <option value="Tomato">Tomato</option>
                  <option value="Onion">Onion</option>
                  <option value="Potato">Potato</option>
                  <option value="Paddy">Paddy / Rice</option>
                  <option value="Ragi">Ragi (Finger Millet)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Describe Your Agronomic Question or Soil Problem
                </label>
                <textarea
                  rows={4}
                  required
                  value={expertQuestion}
                  onChange={e => setExpertQuestion(e.target.value)}
                  placeholder="e.g. Tomato fruits have black sunken bottoms (blossom end rot). Drip water is from borewell with high carbonate..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to KVK Scientist</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* New Post Modal */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePost}
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Create Kisan Community Post</h3>
              <button
                type="button"
                onClick={() => setIsNewPostOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Crop Tag</label>
                  <select
                    value={newCropTag}
                    onChange={e => setNewCropTag(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Onion">Onion</option>
                    <option value="Potato">Potato</option>
                    <option value="Paddy">Paddy</option>
                    <option value="Ragi">Ragi</option>
                    <option value="Logistics">Logistics / Transport</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    value={newDistrict}
                    onChange={e => setNewDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Share Market Experience, Rate or Agronomy Question
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="You can write in Kannada, Hindi, or English..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewPostOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer shadow-xs"
              >
                Post to Feed
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
