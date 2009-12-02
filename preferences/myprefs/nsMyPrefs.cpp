// This is important to allow inclusion of certain headers, don't 
// bother too much with it, just make sure you include it.
#define MOZILLA_INTERNAL_API 1

#include <stdio.h>
#include "nsMyPrefs.h"
#include "nsMemory.h"
#include "nsCOMPtr.h"
#include "nsISupportsUtils.h"

#include "nsServiceManagerUtils.h"
#include "nsIPrefService.h"
#include "nsIPrefBranch.h"
#include "nsIPrefBranch2.h"
#include "nsILocalFile.h"

// Macro that expands to the implementation of AddRef, Release, and
// QueryInterface, as well as some of the support classes needed
// by the module registration macros. The "1" in ISUPPORTS1 means
// we only implement one interface (nsISupports is impliclit).
NS_IMPL_ISUPPORTS1(MyPrefsImpl, nsIMyPrefs)

//
// nsSimpleImpl ctor
//
MyPrefsImpl::MyPrefsImpl()
{
 NS_INIT_ISUPPORTS();
}

//
// nsSimpleImpl dtor
//
MyPrefsImpl::~MyPrefsImpl()
{
  // nothing
}

NS_IMETHODIMP
MyPrefsImpl::SetMultipleFiles(PRBool value, PRBool *saved, PRBool *outSuccess)
{
  *saved = PR_TRUE;  
  *outSuccess = PR_TRUE;  
  
  nsCOMPtr<nsIPrefService> pref(do_GetService(NS_PREFSERVICE_CONTRACTID));
  if (! pref) *saved = PR_FALSE;
  nsCOMPtr<nsIPrefBranch> branch;
  pref->GetBranch("css_stealer.", getter_AddRefs(branch));
  if (! branch) *saved = PR_FALSE;
  nsCOMPtr<nsIPrefBranch2> branch2 (do_QueryInterface(branch));
  if (! branch2) *saved = PR_FALSE;
  branch2->SetBoolPref("savemultiple", value);    

  return NS_OK;
}

NS_IMETHODIMP
MyPrefsImpl::SetPath(const nsAString & value, PRBool *saved, PRBool *outSuccess)
{
  *outSuccess = PR_TRUE;
  *saved = PR_TRUE;  
  
  nsCOMPtr<nsIPrefService> pref(do_GetService(NS_PREFSERVICE_CONTRACTID));
  if (! pref) *saved = PR_FALSE;
  nsCOMPtr<nsIPrefBranch> branch;
  pref->GetBranch("css_stealer.", getter_AddRefs(branch));
  if (! branch) *saved = PR_FALSE;
  nsCOMPtr<nsIPrefBranch2> branch2 (do_QueryInterface(branch));
  if (! branch2) *saved = PR_FALSE;
  char* text = ToNewUTF8String(value);
  branch2->SetCharPref("path", text);
  
  nsresult rv;
  nsCOMPtr<nsILocalFile> file = do_CreateInstance("@mozilla.org/file/local;1");
  file->InitWithPath(value);
  rv = file->Exists(saved);
  
  return NS_OK;
}

NS_IMETHODIMP
MyPrefsImpl::GetPath(nsACString & path, PRBool *outSuccess)
{ 
  *outSuccess = PR_TRUE;   
  nsCOMPtr<nsIPrefService> pref(do_GetService(NS_PREFSERVICE_CONTRACTID));
  if (! pref) *outSuccess = PR_FALSE;
  nsCOMPtr<nsIPrefBranch> branch;
  pref->GetBranch("css_stealer.", getter_AddRefs(branch));
  if (! branch) *outSuccess = PR_FALSE;
  nsCOMPtr<nsIPrefBranch2> branch2 (do_QueryInterface(branch));
  if (! branch2) *outSuccess = PR_FALSE;
  branch2->GetCharPref("path", getter_Copies(path));
  
  return NS_OK;
}

NS_IMETHODIMP
MyPrefsImpl::GetMultipleFiles(PRBool * value, PRBool *outSuccess)
{ 
  *outSuccess = PR_TRUE;   
  nsCOMPtr<nsIPrefService> pref(do_GetService(NS_PREFSERVICE_CONTRACTID));
  if (! pref) *outSuccess = PR_FALSE;
  nsCOMPtr<nsIPrefBranch> branch;
  pref->GetBranch("css_stealer.", getter_AddRefs(branch));
  if (! branch) *outSuccess = PR_FALSE;
  nsCOMPtr<nsIPrefBranch2> branch2 (do_QueryInterface(branch));
  if (! branch2) *outSuccess = PR_FALSE;
  branch2->GetBoolPref("savemultiple", value);
  
  return NS_OK;
}
//***************************************************************
//***************************************************************

//
// Module info
//
// Most examples have the module in a separate file, but there's no
// need to do that. Change the macros and class names to reference
// your own class.
//

#include "nsIGenericFactory.h"

NS_GENERIC_FACTORY_CONSTRUCTOR(MyPrefsImpl)

static nsModuleComponentInfo components[] =
{
  { "MyPrefs component",        // description, for us humans
    NS_MYPREFS_CID,             // in nsSimple.h
    NS_MYPREFS_PROG_ID,         // in nsSimple.h
    MyPrefsImplConstructor,
  }
};
NS_IMPL_NSGETMODULE(MyPrefsImpl, components)
