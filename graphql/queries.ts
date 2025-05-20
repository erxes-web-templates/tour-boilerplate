import { gql } from "@apollo/client";

export const TOURS_QUERY = gql`
  query BmTours($page: Int, $perPage: Int, $status: String) {
    bmTours(page: $page, perPage: $perPage, status: $status) {
      total
      list {
        _id
        content
        startDate
        endDate
        cost
        viewCount
        name
        itineraryId
        itinerary {
          images
        }
        imageThumbnail
        images
        refNumber
      }
    }
  }
`;

export const TOUR_DETAIL_QUERY = gql`
  query BmTourDetail($id: String!) {
    bmTourDetail(_id: $id) {
      _id
      branchId
      content
      cost
      name
      status
      startDate
      refNumber
      images
      imageThumbnail
      viewCount
    }
  }
`;

export const CP_GET_CONFIG = gql`
  query clientPortalGetConfig($_id: String!) {
    clientPortalGetConfig(_id: $_id) {
      _id
      name
      template
      templateId
      url
      externalLinks
      copyright
      keywords
      kind
      description
      logo
      icon
      headerHtml
      footerHtml
      domain
      dnsStatus
      messengerBrandCode
      knowledgeBaseLabel
      knowledgeBaseTopicId
      ticketLabel
      dealLabel
      purchaseLabel
      taskPublicPipelineId
      taskPublicBoardId
      taskPublicLabel
      taskLabel
      taskStageId
      taskPipelineId
      taskBoardId
      ticketStageId
      ticketPipelineId
      ticketBoardId
      dealStageId
      dealPipelineId
      dealBoardId
      purchaseStageId
      purchasePipelineId
      purchaseBoardId
      styles {
        bodyColor
        headerColor
        footerColor
        helpColor
        backgroundColor
        activeTabColor
        baseColor
        headingColor
        linkColor
        linkHoverColor
        baseFont
        headingFont
        dividerColor
        primaryBtnColor
        secondaryBtnColor
      }
      mobileResponsive
      googleCredentials
      googleClientId
      googleClientSecret
      googleRedirectUri
      facebookAppId
      erxesAppToken
      kbToggle
      publicTaskToggle
      ticketToggle
      taskToggle
      dealToggle
      purchaseToggle
      otpConfig {
        smsTransporterType
        content
        codeLength
        loginWithOTP
        expireAfter
        emailSubject
      }
      twoFactorConfig {
        smsTransporterType
        content
        codeLength
        enableTwoFactor
        expireAfter
        emailSubject
      }
      mailConfig {
        subject
        invitationContent
        registrationContent
      }
      manualVerificationConfig {
        userIds
        verifyCustomer
        verifyCompany
      }
      passwordVerificationConfig {
        verifyByOTP
        emailSubject
        emailContent
        smsContent
      }
      socialpayConfig {
        certId
        publicKey
      }
      testUserEmail
      testUserPhone
      testUserPassword
      testUserOTP
      tokenExpiration
      refreshTokenExpiration
      tokenPassMethod
      vendorParentProductCategoryId
      language
    }
  }
`;

export const GET_CMS_PAGE = gql`
  query CmsPage($id: String!) {
    cmsPage(_id: $id) {
      _id
      name
      content
      createdAt
      updatedAt
      pageItems {
        type
        content
        order
        contentType
        contentTypeId
        config
      }
    }
  }
`;

export const GET_CMS_MENU = gql`
  query CmsMenu($id: String!) {
    cmsMenu(_id: $id) {
      _id
      url
      parentId
      parent {
        url
        _id
        contentType
        contentTypeID
        icon
        kind
        label
        parentId
        order
      }
    }
  }
`;

export const GET_CMS_MENU_LIST = gql`
  query CmsMenuList($clientPortalId: String!, $kind: String) {
    cmsMenuList(clientPortalId: $clientPortalId, kind: $kind) {
      _id
      url
      parentId
      icon
      kind
      label
      contentType
      contentTypeID
      order
    }
  }
`;

export const GET_CMS_PAGES = gql`
  query CmsPages($clientPortalId: String!) {
    cmsPages(clientPortalId: $clientPortalId) {
      _id
      name
      type
      slug
      content
      createdAt
      updatedAt
    }
  }
`;

export const GET_CMS_POSTS = gql`
  query CmsPosts(
    $clientPortalId: String
    $featured: Boolean
    $categoryId: String
    $searchValue: String
    $status: PostStatus
    $page: Int
    $perPage: Int
    $tagIds: [String]
  ) {
    cmsPosts(
      clientPortalId: $clientPortalId
      featured: $featured
      categoryId: $categoryId
      searchValue: $searchValue
      status: $status
      page: $page
      perPage: $perPage
      tagIds: $tagIds
    ) {
      _id
      authorKind
      authorId
      author {
        ... on User {
          details {
            fullName
          }
        }
      }
      clientPortalId
      title
      slug
      content
      excerpt
      categoryIds
      status
      tagIds
      featured
      thumbnail {
        url
        name
      }
      createdAt
      updatedAt
      categories {
        _id
        name
      }
      tags {
        _id
        name
      }
    }
  }
`;

export const GET_CMS_POST = gql`
  query CmsPost($slug: String, $id: String) {
    cmsPost(slug: $slug, _id: $id) {
      _id
      content
      categories {
        _id
        name
      }
      title
      featured
      thumbnail {
        url
        name
      }
    }
  }
`;

export const GET_FORM_DETAIL = gql`
  query FormDetail($id: String!) {
    formDetail(_id: $id) {
      _id
      title
      description
      fields {
        _id
        code
        field
        column
        text
        validation
        name
        content
        contentType
        contentTypeId
        order
        options
        optionsValues
        type
      }
    }
  }
`;

export const PAYMENTS = gql`
  query payments($status: String, $kind: String) {
    payments(status: $status, kind: $kind) {
      _id
      name
      kind
      status
      config
    }
  }
`;
